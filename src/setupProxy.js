const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    //端口代理，不会产生跨域问题
    createProxyMiddleware({
      target: 'http://localhost:7001',
      changeOrigin: true,
    })
  );
};