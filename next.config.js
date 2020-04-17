const isProd = process.env.NODE_ENV == 'production' ? true: false;

module.exports ={
  publicRuntimeConfig: {
    API_PATH:  'https://api.fsn365.com/'
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the affer
    maxInactiveAge: 250 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 400,
  },
  devIndicators: {
    autoPrerender: true,
  },
  generateBuildId: async () => {
    return 'v0'
  },
  exportTrailingSlash: true
};
