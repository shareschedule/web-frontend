import { Pagination } from '@/app/_type/api/responseModel/Pagination'
import { AxiosHeaders } from 'axios'

export type ResponseModel<T> = {
  config: object
  data: { data: T; pagination: Pagination }
  headers: AxiosHeaders
  request: XMLHttpRequest
  status: number
  statusText: string
}
