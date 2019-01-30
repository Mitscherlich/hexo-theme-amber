const path = require('path')

module.exports = {
  outputDir: 'source',
  productionSourceMap: false,
  runtimeCompiler: true,
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
      }
    }
  },
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
  },
  pwa: {
    themeColor: '#ffffff',
    msTileColor: '#ffffff'
  }
}
