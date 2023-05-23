import { Configuration, DefinePlugin } from "webpack";
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import nodeExternals from "webpack-node-externals";

import paths, { resolve } from "./paths";

export const serverConfig = (entry: string, dev: boolean): Configuration =>
{
	const config: Configuration = {
		name: "server",
		mode: dev ? "development" : "production",
		entry: resolve(entry),
		context: paths.root,
		target: "node",
		externalsPresets: { node: true },
		externals: [nodeExternals()],
		output: {
			asyncChunks: false,
			clean: false,
			chunkFilename: "[contenthash].chunk.js",
			path: resolve("dist"),
			publicPath: "/",
			filename: "[name].bundle.js"
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
			]
		},
		plugins: [
			new DefinePlugin({
				env: {
					isDev: dev,
					isProd: !dev,
					isServer: true,
					isClient: false
				}
			}),
			// new ForkTsCheckerWebpackPlugin(),
		],
		experiments: {
			topLevelAwait: true
		},
		watchOptions: {
			ignored: /node_modules/,
		},
	};



	if (dev)
		config.devtool = "inline-source-map";

	return config;
};