const path = require('path');
const { merge } = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');

const commonConfig = require('./webpack.common');

const config = {
	devtool: 'source-map',
	target: 'node',
	entry: [
		'@babel/polyfill',
		'./src/index.ts'
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},

	// do not bundle any library that exists
	// inside node module folder
	// as they are not needed in the bundle
	// since node have access to it from node_modules
	externals: [webpackNodeExternals()]
};

module.exports = merge(commonConfig, config);
