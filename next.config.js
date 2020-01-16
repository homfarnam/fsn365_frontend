const isProd = process.env.NODE_ENV == 'production' ? true: false;

module.exports ={
  publicRuntimeConfig: {
    API_PATH: isProd ? 'http://localhost:8888/api': 'http://47.103.55.126/api',
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 20,
  },
  devIndicators: {
    autoPrerender: true,
  },
  compress: true,
};
