const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const conf = {
	entry: "./src/index.js",
	output: {
		publicPath: "/",
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js"
	},
	devServer: {
		port: 8080,
		host: "localhost",
		overlay: {
			errors: true,
			warnings: false
		},
		historyApiFallback: true,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				logLevel: "debug",
				changeOrigin: true
			}
		},
		stats: "minimal"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader", "eslint-loader"]
			},

			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[hash].[ext]",
							outputPath: "images/"
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	optimization: {
		minimizer: [new TerserPlugin()]
	},
	plugins: [
		new CleanWebpackPlugin("dist", { root: __dirname }),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			minify: {
				removeScriptTypeAttributes: true
			}
		}),
		new Dotenv(),
		new ErrorOverlayPlugin()
	]
};

module.exports = (env, options) => {
	let production = options.mode === "production";

	conf.devtool = production ? "source-map" : "eval-source-map";

	return conf;
};
