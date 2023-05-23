import { Configuration, DefinePlugin } from "webpack";
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

import paths, { resolve } from "./paths";

export const clientConfig = (entry: string, dev: boolean): Configuration =>
{
	const config: Configuration = {
		name: "client",
		mode: dev ? "development" : "production",
		entry: resolve(entry),
		context: paths.root,
		target: "web",
		output: {
			asyncChunks: false,
			clean: false,
			chunkFilename: "[contenthash].chunk.js",
			path: resolve("dist/public"),
			publicPath: "/",
			filename: "js/[name].bundle.js"
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
			]
		},
		resolve: {
			extensions: [".tsx", ".ts", ".jsx", ".js"],
			plugins: [
				new TsconfigPathsPlugin({})
			],
			fallback: {
				buffer: require.resolve("buffer")
			}
		},
		plugins: [
			new DefinePlugin({
				env: {
					isDev: dev,
					isProd: !dev,
					isServer: false,
					isClient: true
				}
			}),
			// new ForkTsCheckerWebpackPlugin(),
		],
		optimization: {
			runtimeChunk: "single",
			splitChunks: {
				cacheGroups: {
					default: {
						name: "default",
						chunks: "async",
						priority: 10,
						reuseExistingChunk: true,
						enforce: true
					},
					commons: {
						name: "commons",
						chunks: "initial",
						minChunks: 2,
						priority: 0,
					},
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
						priority: 20
					}
				}
			}
		},
		experiments: {
			topLevelAwait: true
		},
		watchOptions: {
			ignored: /node_modules/,
		},
	};

	if(dev)
		config.devtool = "inline-source-map";

	return config;
};