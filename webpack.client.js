const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const commonConfig = require('./webpack.common');

const config = {
	devtool: 'source-map',
	entry: [
		'@babel/polyfill',
		'./src/client/client.tsx'
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},

	// plugins: [
	// 	new webpack.SourceMapDevToolPlugin()
	// ]
};

module.exports = merge(commonConfig, config);
