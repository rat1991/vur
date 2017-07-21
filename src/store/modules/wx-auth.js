const wxAuth = {
  state: {
    syncLS: false,
    accessToken: '',
    refreshToken: '',
    userInfo: {},
    containRoles: [],
    tokenExpiredTime: new Date()
  }
}