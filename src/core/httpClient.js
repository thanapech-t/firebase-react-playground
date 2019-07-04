import axios from 'axios'
import humps from 'humps'
import deepmerge from 'deepmerge'

export const API_HOST = process.env.REACT_APP_API_HOST

/* eslint no-param-reassign: 0 */

axios.defaults.baseURL = API_HOST

axios.interceptors.request.use(
  config => {
    const {data, ...others} = config
    // const noonAuthtoken = window.localStorage.getItem('Noon-Auth-Token')
    config = deepmerge(others, {
      // headers: {
      //   'Noon-Auth-Token':
      //     noonAuthtoken === 'null' || noonAuthtoken === null
      //       ? ''
      //       : noonAuthtoken,
      // },
      data: humps.decamelizeKeys(data),
    })
    if (config.method !== 'get' && config.method !== 'delete') {
      config.data = humps.decamelizeKeys(config.data)
    } else {
      config.params = humps.decamelizeKeys(config.params)
    }
    return config
  },
  e => Promise.reject(e),
)

axios.interceptors.response.use(
  response => {
    response = humps.camelizeKeys(response)
    return response
  },
  e => {
    return Promise.reject(e)
  },
)

export const httpGet = (url, params = {}, headers = {}) =>
  axios.get(url, {params, headers})
export const httpPost = (url, props = {}, headers = {}) =>
  axios.post(url, props, headers)
export const httpPut = (url, props = {}, headers = {}) =>
  axios.put(url, props, headers)
export const httpPatch = (url, props = {}, headers = {}) =>
  axios.patch(url, {...props, headers})
export const httpDelete = (url, params = {}, headers = {}) =>
  axios.delete(url, {params, headers})
