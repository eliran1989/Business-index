module.exports = {
    id: 'default',
    distDir: 'dist/.ssr',
    viewsDir: 'views',
    staticViews: [],
    webpack: (config /* webpack.Configuration */, env /* 'development' | 'production' */) => {
      return config;
    },
  };