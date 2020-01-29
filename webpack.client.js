const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

const config = {
	entry: [
		'@babel/polyfill',
		'./src/client/client.tsx'
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	}
};

module.exports = merge(commonConfig, config);
