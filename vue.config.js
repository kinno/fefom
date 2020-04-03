var path = require('path');
var realFs = require('fs')
var gracefulFs = require('graceful-fs')
gracefulFs.gracefulify(realFs)

module.exports = {
publicPath: "/",
lintOnSave: false,
devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: '80',
    hot: true,
public: '0.0.0.0:80',
 headers: {
            'Access-Control-Allow-Origin': '*'
        },
  },
};
