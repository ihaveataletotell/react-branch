import * as Webpack from 'webpack';
import * as path from 'path';
import {ExportArgv, ExportEnv, Product} from './webpack.types';
import {getJsMinimizer, getPlugins, getRules} from './webpack.common';

module.exports = (env: ExportEnv, argv: ExportArgv | undefined): Webpack.Configuration => {
	const product: Product = {};
	const isProd = argv?.mode == 'production';

	console.log(env);
	console.log(argv);

	return {
		devtool: isProd ? false : 'eval-source-map',
		entry: './src/testEnv.tsx',
		devServer: {
			port: 8080,
			hot: true,
		},
		module: {
			rules: getRules(product, env, argv),
		},
		optimization: {
			minimize: isProd,
			minimizer: getJsMinimizer(product),
		},
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'built'),
		},
		plugins: getPlugins(product, env),
		resolve: {
			alias: {'@': path.resolve(__dirname, 'src')},
			extensions: ['.js', '.ts', '.tsx'],
			modules: ['node_library', 'node_modules', 'src', '.'],
		},
	};
};
