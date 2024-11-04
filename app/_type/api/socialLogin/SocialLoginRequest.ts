export type OauthCredential = {
  code: string
  state: string
}

export type UserInfo = {
  nickname: string
  image: number[]
}

export type RequestSignup = {
  oauthCredential: OauthCredential
  userInfo: UserInfo
}
