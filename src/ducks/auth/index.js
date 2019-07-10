import { put, takeLatest, call } from 'redux-saga/effects'
import { createReducer, Creator } from '../helper'
import auth from '../../firebase'

const SET_DATA_AUTH = 'SET_DATA_AUTH'
const GET_DATA_AUTH = 'GET_DATA_AUTH'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export const setDataAuth = Creator(SET_DATA_AUTH, 'data')
export const getUserInfo = Creator(GET_DATA_AUTH)
export const login = Creator(LOGIN, 'data')
export const logout = Creator(LOGOUT)

function onAuthStateChanged() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(user)
      } else {
        reject(new Error('Ops!'))
      }
    })
  })
}

export function* getUserInfoSaga() {
  try {
    const response = yield call(onAuthStateChanged)
    const checkToken = sessionStorage.getItem('tokenFirebase')

    if (checkToken) {
      if (response.email) {
        yield put(setDataAuth({ user: response.email, isLogin: true }))
      }
    }
  } catch (error) {
  } finally {
    yield put(setDataAuth({ initialized: true }))
  }
}

export function* loginSaga({ payload: { data } }) {
  try {
    const response = yield auth.signInWithEmailAndPassword(
      data.email,
      data.password,
    )
    sessionStorage.setItem('tokenFirebase', response.user.ra)
    yield put(setDataAuth({ user: response.user.email, isLogin: true }))
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
        yield put(setDataAuth({ errorMessage: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }))
        break
      case 'auth/wrong-password':
        yield put(setDataAuth({ errorMessage: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }))
        break
      default:
        yield put(setDataAuth({ errorMessage: 'เซิฟเวอร์มีปัญหา' }))
        break
    }
  } finally {
    yield put(
      setDataAuth({
        isLoading: false,
      }),
    )
  }
}

export function* logoutSaga() {
  try {
    yield auth.signOut()
    sessionStorage.clear()
    yield put(setDataAuth({ isLogin: false, user: {} }))
  } catch (error) {
  } finally {
    yield put(
      setDataAuth({
        isLoading: false,
      }),
    )
  }
}

export function* authWatcher() {
  yield takeLatest(GET_DATA_AUTH, getUserInfoSaga)
  yield takeLatest(LOGIN, loginSaga)
  yield takeLatest(LOGOUT, logoutSaga)
}

const initial = {
  user: {},
  initialized: false,
  isLogin: false,
  isLoading: false,
  errorMessage: '',
  routes: [],
}

const reducer = createReducer(initial, state => ({
  [SET_DATA_AUTH]: ({ data }) => ({
    ...state,
    ...data,
  }),
}))

export default reducer
