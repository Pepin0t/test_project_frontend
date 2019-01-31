module.exports = {
	env: {
		production: {
			plugins: ["transform-react-remove-prop-types"]
		},
		test: {
			presets: ["@babel/preset-env", "@babel/react"]
		}
	},
	presets: ["@babel/preset-env", "@babel/react"],
	plugins: [
		"babel-plugin-styled-components",
		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-proposal-object-rest-spread",
		"@babel/plugin-transform-async-to-generator",
		"@babel/plugin-proposal-async-generator-functions",
		"@babel/plugin-transform-regenerator",
		"@babel/plugin-transform-runtime"
	]
};
