module.exports = {
    devServer: {
        port: 3000,
        //这个是改变我们当前项目的端口号
        open: true,
        // 这个是自动打开浏览器
        proxy:'https://www.escook.cn'
    }
}