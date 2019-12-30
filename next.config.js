const isProd = process.env.NODE_ENV === 'production' ? true: false;

module.exports ={
  publicRuntimeConfig: {
    API_PATH: isProd ? 'http://localhost:8888/api': 'http://localhost:8888/api',
  }
};
