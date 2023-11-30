const express = require('express');
const httpProxy = require('http-proxy');

// 定义反向代理的目标 URL
const targetUrl = 'https://bing.cf03-b29.workers.dev';

// 创建反向代理服务器
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  changeOrigin: true
});

// 创建 Express 应用程序
const app = express();

// 添加反向代理规则
app.use('/', (req, res) => {
  // 将请求转发到反向代理服务器
  proxy.web(req, res, { target: targetUrl });
});

// 启动应用程序
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
