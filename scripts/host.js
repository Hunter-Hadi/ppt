const HOST_CONFIG = {
  dev: {
    wwwProjectHost: 'https://main.d35dysdwr52gaf.amplifyapp.com',
    appProjectHost: 'https://main.d3bohqvl407i44.amplifyapp.com',
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
};

function getHostConfig() {
  const node_env = String(process.env.NEXT_PUBLIC_ENV || 'dev');

  const WWW_PROJECT_HOST = HOST_CONFIG[node_env].wwwProjectHost;
  const APP_PROJECT_HOST = HOST_CONFIG[node_env].appProjectHost;

  return {
    WWW_PROJECT_HOST,
    APP_PROJECT_HOST,
  };
}

module.exports = { getHostConfig };
