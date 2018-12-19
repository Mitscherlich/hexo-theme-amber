const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const merge = require('lodash.merge')

const config = {
  productionSourceMap: false,
}

const build = {
  outputDir: 'source',
  indexPath: path.relative('source', 'layout/index.ejs'),
  devServer: {
    proxy: {
      '/api': {
        'target': 'http://localhost:4000/api',
        'changeOrigin': true,
        'pathRewrite': { '^/api': '' },
      },
      '/assets': {
        'target': 'http://localhost:4000/assets',
        'changeOrigin': true,
        'pathRewrite': { '^/assets': '' },
      },
    },
  },
}

const server = {
  configureWebpack: {
    plugins: [
      new PrerenderSpaPlugin(
        path.resolve(__dirname, './dist'),
        ['/', '/archives', '/messages', '/donate', '/projects', '/profile'], {
          renderAfterTime: 5000,
          maxAttempts: 10,
        }
      )
    ]
  }
}

const ssr = (
  process.env.VUE_ENV === 'server' &&
  process.env.NODE_ENV === 'production'
)

module.exports = merge(config, ssr ? server : build)
