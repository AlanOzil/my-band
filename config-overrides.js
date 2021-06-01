const { override, overrideDevServer } = require('customize-cra');
const addProxy = () => (configFunction) => {
    configFunction.proxy = {
      '/getSong': {
        target: 'https://api.imjad.cn/cloudmusic/',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '/getSong': '/'}
      },
      '/netCollect': {
        target: 'http://127.0.0.1:7020/',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '/netCollect': '/'},
        headers: {
          'Origin': 'http://localhost'
        }
      }
    }

    return configFunction;
}

module.exports = {
  devServer: overrideDevServer(
      addProxy()
  )
}