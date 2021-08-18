import * as Webpack from 'webpack';
import * as Types from './webpack.types';
import * as Package from './package.json';
import {formatDate} from './tools';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const incstr = require('incstr');

export const getRules = (product: Types.Product, env: Types.ExportEnv, argv: Types.ExportArgv | undefined): Webpack.RuleSetRule[] => {
	const isProd = argv?.mode == 'production';
	const fileFormat = '[contenthash:5].[ext]';

	return [
		{
			test: /[\\/]@res[\\/][\w\-. ]+\.svg$/,
			issuer: /\.tsx$/,
			use: {
				loader: '@svgr/webpack',
			},

		},
		{
			test: /[\\/]@fonts[\\/][\w\-. ]+\./,
			use: {
				loader: 'file-loader',
				options: {
					name: `fonts/${fileFormat}`,
				},
			},
		},
		{
			test: /[\\/]@img[\\/][\w\-. ]+\./,
			use: {
				loader: 'file-loader',
				options: {
					name: `img/${fileFormat}`,
				},
			},
		},
		{
			test: /[\\/]@res[\\/][\w\-. ]+\.(gif|jpg|png|svg)$/,
			issuer: /\.sass$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 4 * 1024,
					name: `img/${fileFormat}`,
				},
			},
		},
		{
			test: /\.sass$/,
			exclude: /\.typed.sass$/,
			use: getCssLoaders({forTypedCss: false, isProd}),
		},
		{
			test: /\.typed.sass$/,
			use: getCssLoaders({forTypedCss: true, isProd}),
		},
		{
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: 'ts-loader',
				},
				{
					loader: 'string-replace-loader',
					options: {
						multiple: [
							{
								flags: 'g',
								search: '{{BUILD_VERSION}}',
								replace: (() => {
									const version = Package.version;
									const userName = require('os').userInfo().username;

									return `${formatDate(Date.now(), 'YYYY.MM.DD / HH:NN')} / v${version} / ${userName}`;
								})()
							},
						],
					},
				},
			],
		},
	];
};

export const getJsMinimizer = (product: Types.Product): Webpack.WebpackPluginInstance[] => {
	return [
		new TerserPlugin({
			// Выключение лицензионных файлов.
			extractComments: false,
			parallel: false,
			terserOptions: {
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
		...getDevServerPlugins(product, env),
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

export const getDevServerPlugins = (product: Types.Product, env: Types.ExportEnv): Webpack.WebpackPluginInstance[] => {
	if (!env.viewMode) return [];

	return [
		new HtmlWebpackPlugin({
			template: './static/index.html',
			inject: true,
		}),
	]
}

const getCssLoaders = (options: GetCssLoaderOptions): Webpack.RuleSetRule[] => {
	const sassLoader: Webpack.RuleSetRule = {
		loader: 'sass-loader',
		options: {
			sassOptions: {
				indentedSyntax: true,
			},
			additionalData: '@import "./src/styles/variables.sass"',
		},
	};

	const postCssLoader: Webpack.RuleSetRule = {
		loader: 'postcss-loader',
		options: {
			postcssOptions: {
				plugins: [
					['postcss-combine-media-query'],
					['cssnano'],
				],
			}
		}
	};

	const typedCssLoaderOrNothing: Webpack.RuleSetRule | undefined = !options.forTypedCss
		? undefined
		: {
			loader: 'typed-css-modules-loader',
			options: {
				searchDir: 'src',
				namedExports: true,
				modules: true,
				camelCase: 'dashes',
			},
		};

	return [
		...getCssLoaderAndEmitter(options),
		postCssLoader,
		typedCssLoaderOrNothing,
		sassLoader,
	].filter(Boolean) as Webpack.RuleSetRule[];
}

interface GetCssLoaderOptions {
	isProd: boolean;
	forTypedCss: boolean;
}

const getCssLoaderAndEmitter = (options: GetCssLoaderOptions): Webpack.RuleSetRule[] => {
	const namedExportFlagValue = options.forTypedCss;

	const cssEmitter: Webpack.RuleSetRule = options.isProd
		? {
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: './',
				esModule: true,
				modules: {
					namedExport: namedExportFlagValue,
				},
			},
		} : {
			loader: 'style-loader',
			options: {
				esModule: true,
				modules: {
					namedExport: namedExportFlagValue,
				},
			},
		};

	const getLocalIdentCssLoaderProdFn = (context: {resourcePath: string}, localIdentName: string, localName: string) => (
		getScopedName(localName, context.resourcePath, options.isProd)
	);

	const cssLoader: Webpack.RuleSetRule = {
		loader: 'css-loader',
		options: {
			modules: {
				getLocalIdent: getLocalIdentCssLoaderProdFn,
				localIdentName: '[name]___[local]-[hash:base64:3]',
				namedExport: namedExportFlagValue,
			},
		},
	};

	return [
		cssEmitter,
		cssLoader,
	];
}

enum Themes {}
enum Reserved {}

class UniqueShortIdGenerator {
	static readonly alphabet: string = 'abcefghijklmnopqrstuvwxyzABCEFGHJKLMNOPQRSTUVWXYZ0123456789';

	private readonly doGenerateId: () => string;
	private readonly generatedAlphabet: string;
	private readonly uniqIds: { [key: string]: string };

	constructor(alphabet: string = '') {
		this.uniqIds = {};

		this.generatedAlphabet = alphabet || UniqueShortIdGenerator.alphabet.split('')
			.sort(() => Math.random() > 0.5 ? 1 : -1)
			.join('');

		this.doGenerateId = incstr.idGenerator({
			alphabet: this.generatedAlphabet,
		});
	}

	public generateNextId(name: string) {
		if (this.uniqIds[name]) return this.uniqIds[name];
		return this.uniqIds[name] = this.doGenerateId();
	}
}


const staticNameIdGenerator = new UniqueShortIdGenerator('nGQoghN8TiYctp1ZAk0wjCFBaRMysmx25rP36eJbSEUz79qOV4flLHKXWvu');
const unifiedNameIdGenerator = new UniqueShortIdGenerator('ZQBNx1e5RvFfH6JrcoMKykSULC73XA8azqOEVhugmsGbw24tW90njpTPiY');
const nonDictSymbol = 'l';

function getScopedName(localName: string, resourcePath: string, isProduction?: boolean): string | never | null {
	const isGlobal = Reserved[localName as keyof typeof Reserved];
	if (isGlobal) return localName;

	const isGlobalUniqueHashed = Themes[localName as keyof typeof Themes];

	if (!isProduction) {
		// для локалки хотим не модульный css на глобальные штуки
		if (isGlobalUniqueHashed) return localName;
		// fallback css-modules behaviour
		return null;
	}

	if (isGlobalUniqueHashed) {
		const localStaticId = staticNameIdGenerator.generateNextId(localName);

		if (!localStaticId) {
			throw new Error(
				`localStaticId: "${localStaticId}" is undefined. Unexpected id\n` +
				`Something wrong`
			);
		}

		return `${nonDictSymbol}${localStaticId}`;
	}

	if (!localName || !resourcePath) {
		throw new Error(
			`localName: "${localName}" or resourcePath: "${resourcePath}" is undefined. Styles collision is possible`
		);
	}

	const localId = unifiedNameIdGenerator.generateNextId(resourcePath + localName);

	if (!localId) {
		throw new Error(
			`localId: "${localId}" is undefined. Unexpected id\n` +
			`(localName: "${localName}" or resourcePath: "${resourcePath}" is possible invalid)`
		);
	}

	return `${localId}`;
}


