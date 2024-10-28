import axios from 'axios'
//TODO: API 통신관련 설정 추가하기

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_CALENDAR_URL,
  headers: {
    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_DEV_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
})
