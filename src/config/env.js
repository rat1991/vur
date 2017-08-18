let env = {
  SERVER_ROOT: '',
  LOCAL_ROOT: '',
  CLIENT_ID: '',
  CLIENT_SECRET: ''
}

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  env.SERVER_ROOT = '' // 开发服务器地址
  env.LOCAL_ROOT = '/'
  env.CLIENT_ID = ''
  env.CLIENT_SECRET = ''

} else if(process.env.NODE_ENV === 'production'){
  // 生产环境
}

export default env;