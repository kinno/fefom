var path = require('path');

module.exports = {
publicPath: "./",
lintOnSave: false,
devServer:{
	public: 'sgi.edomex.gob.mx/fefom/',
    host: '0.0.0.0',
    hot:true,
    port: 8080,  
    open: 'Google Chrome',
    historyApiFallback: true,
	compress: true,
	disableHostCheck: true,
  },
};
