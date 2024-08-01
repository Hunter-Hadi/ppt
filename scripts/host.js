
const HOST_CONFIG = {
  dev: {
    wwwProjectHost: 'https://main.d35dysdwr52gaf.amplifyapp.com',
    appProjectHost: 'https://main.d3kf9o74pc4m0c.amplifyapp.com',
    appProjectAPIHost: 'https://dev.maxai.me',
  },
  test: {
    wwwProjectHost: 'https://main.d35dysdwr52gaf.amplifyapp.com',
    appProjectHost: 'https://test.d3kf9o74pc4m0c.amplifyapp.com',
    appProjectAPIHost: 'https://test.maxai.me',
  },
  prod: {
    wwwProjectHost: 'https://www.maxai.me',
    appProjectHost: 'https://app.maxai.me',
    appProjectAPIHost: 'https://api.maxai.me',
  },
}

function getHostConfig() {
  // 是否是本地开发环境
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment) {
    return {
      WWW_PROJECT_HOST: 'http://localhost:3001',
      APP_PROJECT_HOST: 'http://localhost:3000',
      API_PROJECT_HOST: 'https://dev.maxai.me',
    }
  }

  const node_env = String(process.env.NEXT_PUBLIC_ENV || 'dev')

  const WWW_PROJECT_HOST = HOST_CONFIG[node_env].wwwProjectHost
  const APP_PROJECT_HOST = HOST_CONFIG[node_env].appProjectHost
  const API_PROJECT_HOST = HOST_CONFIG[node_env].appProjectAPIHost

  return {
    WWW_PROJECT_HOST,
    APP_PROJECT_HOST,
    API_PROJECT_HOST,
  }
}

module.exports = { getHostConfig }
