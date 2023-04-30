// production config
const {merge} = require('webpack-merge')
const { resolve } = require('path')

const commonConfig = require('./common')

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: ['@babel/polyfill', './index.tsx'],
    devtool: 'source-map',
    output: {
        filename: 'js/bundle.[fullhash].min.js',
        path: resolve(__dirname, '../../../dist'),
        publicPath: '/',
    },
    plugins: [],
})
