const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [
						'@babel/preset-react',
						// 'stage-0',
						['@babel/preset-env', {
							targets:
								{ browsers: ['last 2 versions'] }
						}
						]
					]
				}
			},
			{
				test: /\.(ts|tsx)$/,
				use: [
					{
						options: {
							useTranspileModule: true,
							forceIsolatedModules: true,
							// useCache: true,
							useBabel: true,
							babelOptions: {
								babelrc: false /* Important line */,
								presets: [
									[
										'edge',
										{
											transpile: 'modern',
											modules: 'false'
										}
									]
								]
							},
							reportFiles: ['src/**/*.{ts,tsx}'],
							babelCore: '@babel/core'
						},
						loader: 'awesome-typescript-loader'
					}
				],
				include: [path.resolve(__dirname, 'src')]
			},
		],
	},

	resolve: {
		extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx']
	}
};
