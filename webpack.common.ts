import * as Webpack from 'webpack';
import * as Types from './webpack.types';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

export const getRules = (product: Types.Product, env: Types.ExportEnv, argv: Types.ExportArgv | undefined): Webpack.RuleSetRule[] => {
	return [
		{
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: 'ts-loader',
				},
			],
		},
	];
};

export const getJsMinimizer = (product: Types.Product): Webpack.WebpackPluginInstance[] => {
	return [
		new TerserPlugin({
			extractComments: false,
			parallel: false,
			terserOptions: {
				// keep_fnames: /^Conditional/,
				output: {
					comments: false,
				},
			},
		}),
	];
};

export const getCommonPlugins = (product: Types.Product): Webpack.WebpackPluginInstance[] => {
	return [];
};

export const getPlugins = (product: Types.Product, env: Types.ExportEnv): Webpack.WebpackPluginInstance[] => {
	const withAnalyze = env.analyze;

	const plugins = [
		...getCommonPlugins(product),
	];

	if (withAnalyze) {
		plugins.push(
			new BundleAnalyzerPlugin({
				analyzerPort: 8091,
				generateStatsFile: true
			}),
		);
	}

	return plugins.filter(Boolean);
};