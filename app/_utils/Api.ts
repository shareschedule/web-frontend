'use client'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
//TODO: API 통신관련 설정 추가하기

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_CALENDAR_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log(error)
    const httpStatus = error.status
    const accessTokenExpireTime = 1000 * 60 * 60
    const refreshTokenExpireTime = 1000 * 60 * 60
    if (httpStatus) {
      axios
        .post(
          process.env.NEXT_PUBLIC_LOCAL_CALENDAR_URL +
            '' +
            process.env.NEXT_PUBLIC_GET_ACCESS_TOKEN,
          {
            refreshToken: Cookies.get('refreshToken'),
          },
          {},
        )
        .then((response) => {
          const tokenPath = '/'
          const accessCookieConfig = {
            expires: accessTokenExpireTime,
            path: tokenPath,
          }
          const refreshCookieConfig = {
            expires: refreshTokenExpireTime,
            path: tokenPath,
          }
          console.log(accessCookieConfig)
          Cookies.set('accessToken', response.data.data.accessToken, accessCookieConfig)
          Cookies.set('refreshToken', response.data.data.refreshToken, refreshCookieConfig)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
)

export default API
