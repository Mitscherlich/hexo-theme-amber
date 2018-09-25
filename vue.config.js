const path = require('path')

module.exports = {
  outputDir: 'source',
  indexPath: path.relative('source', 'layout/index.ejs'),
  devServer: {
    proxy: {
      '/api': {
        'target': 'http://localhost:4000/api',
        'changeOrigin': true,
        'pathRewrite': {'^/api': ''},
      },
      '/assets': {
        'target': 'http://localhost:4000/assets',
        'changeOrigin': true,
        'pathRewrite': {'^/assets': ''},
      }
    },
  },
  // TODO: Strive to make money for a new computer
  // parallel: require('os').cpus().length > 1,
}
