import * as Webpack from 'webpack';
import * as path from 'path';
import {ExportArgv, ExportEnv, Product} from 'webpack.types';
import {getJsMinimizer, getPlugins, getRules} from 'webpack.common';

module.exports = (env: ExportEnv, argv: ExportArgv | undefined): Webpack.Configuration => {
	const product: Product = {};

	return {
		devtool: false,
		entry: {
			main: [path.resolve(__dirname, 'src', 'index.ts')],
		},
		externals: {
			react: 'commonjs react',
			classnames: 'commonjs classnames',
		},
		module: {
			rules: getRules(product, env, argv),
		},
		optimization: {
			minimizer: getJsMinimizer(product),
		},
		output: {
			library: 'whip-jsx-vc',
			libraryTarget: 'umd',
			filename: 'main.js',
			path: `${__dirname}/lib`,
		},
		plugins: getPlugins(product, env),
		resolve: {
			alias: {'@': path.resolve(__dirname, 'src')},
			extensions: ['.js', '.ts', '.tsx'],
			modules: ['node_library', 'node_modules', 'src', '.'],
		},
		stats: 'verbose',
	};
};
