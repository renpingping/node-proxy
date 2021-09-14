const express = require('express');
// const proxy = require('http-proxy-middleware');
// http-proxy-middleware版本1.0.5的时候默认导出的不是proxy的函数了，需要用以下注释的方式调用
const { createProxyMiddleware: proxy } = require('http-proxy-middleware');
const path = require('path');
const { port=3300, proxy:proxyConfig={} } = require('./serverConfig');
 
const app = express();
app.all('*', function (req, res, next) {    // 解决跨域问题
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");    
    if (req.method == "OPTIONS") {
        res.send(200);       
    } else {
        next();
    }
});
app.use('/', express.static(path.join(__dirname, 'dist')))

Object.keys(proxyConfig).map(key=>{
    app.use(key, proxy(proxyConfig[key]));
})
 
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})