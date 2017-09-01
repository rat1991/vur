const env = {
  SERVER_ROOT: '',
  LOCAL_ROOT: '',
  CLIENT_ID: '',
  CLIENT_SECRET: ''
}

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  env.SERVER_ROOT = 'http://dgzrui.jios.org:8100/hengliang'
  env.LOCAL_ROOT = '/'
  env.API_PATH = '/api/client/app-client/v1.0'
  env.CLIENT_ID = 'weixin'
  env.CLIENT_SECRET = '123456'

} else if(process.env.NODE_ENV === 'production'){
  // 生产环境
}

export default env;