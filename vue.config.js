module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:1000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api': '/'}
            }
        }
    }
}