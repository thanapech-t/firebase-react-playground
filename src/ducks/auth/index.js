import { put, takeLatest, delay } from 'redux-saga/effects'
import { createReducer, Creator } from '../helper'

const SET_DATA_AUTH = 'SET_DATA_AUTH'
const GET_DATA_AUTH = 'GET_DATA_AUTH'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export const setDataUser = Creator(SET_DATA_AUTH, 'data')
export const getUserInfo = Creator(GET_DATA_AUTH)
export const login = Creator(LOGIN, 'data')
export const logout = Creator(LOGOUT)

export function* getUserInfoSaga() {
  try {
    const checkToken = sessionStorage.getItem('loginPlayground')
    if (checkToken) {
      yield put(setDataUser({ isLogin: true }))
    }
  } catch (error) {
  } finally {
    yield put(setDataUser({ initialized: true }))
  }
}

export function* loginSaga({ payload: { data } }) {
  try {
    sessionStorage.setItem('loginPlayground', true)
    yield put(setDataUser({ user: { id: data.id }, isLogin: true }))
  } catch (error) {
  } finally {
    yield put(
      setDataUser({
        isLoading: false,
      }),
    )
  }
}

export function* logoutSaga() {
  try {
    sessionStorage.clear()
    yield put(setDataUser({ isLogin: false }))
  } catch (error) {
  } finally {
    yield put(
      setDataUser({
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
  routes: [],
}

const reducer = createReducer(initial, state => ({
  [SET_DATA_AUTH]: ({ data }) => ({
    ...state,
    ...data,
  }),
}))

export default reducer
