export type SocialLoginResponse<T> = {
  accessToken: string
  refreshToken: string
  isAllday: T
}
