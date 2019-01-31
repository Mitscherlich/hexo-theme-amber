const path = require('path')
const merge = require('lodash.merge')

const isDev = !(process.env.NODE_ENV === 'production');

const config = {
  outputDir: 'source',
  productionSourceMap: false,
  indexPath: path.relative('source', 'layout/index.ejs')
}

const proxy = {
  '/api': {
    'target': 'http://localhost:4000/api',
    'changeOrigin': true,
    'pathRewrite': { '^/api': '' },
  },
  '/assets': {
    'target': 'http://localhost:4000/assets',
    'changeOrigin': true,
    'pathRewrite': { '^/assets': '' },
  }
}

const dev = {
  devServer: { proxy }
}

const prod = {
  pwa: { themeColor: '#ffffff', msTileColor: '#ffffff' },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          bootstrap: {
            name: 'chunk-bootstrap',
            test: /[\\/]node_modules\/bootstrap[\\/]/,
            chunks: 'all',
            reuseExistingChunk: true,
            enforce: true
          },
          bootstrapVue: {
            name: 'chunk-bootstrap-vue',
            test: /[\\/]node_modules\/bootstrap-vue[\\/]/,
            chunks: 'all',
            reuseExistingChunk: true,
            enforce: true
          },
          fontAwesome: {
            name: 'chunk-font-awesome',
            test: /[\\/]node_modules\/@fortawesome[\\/]/,
            chunks: 'all',
            reuseExistingChunk: true,
            enforce: true
          },
          markdownIt: {
            name: 'chunk-markdown-it',
            test: /[\\/]node_modules\/markdown-it[\\/]/,
            chunks: 'all',
            reuseExistingChunk: true,
            enforce: true
          },
          vue: {
            name: 'chunk-vue',
            test: /[\\/]node_modules\/vue[\\/]/,
            chunks: 'all',
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
  }
}

module.exports = merge(config, isDev ? dev: prod)
