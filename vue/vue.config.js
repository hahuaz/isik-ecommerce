"use strict";
const path = require("path");

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	devServer: {
		proxy: "http://127.0.0.1:8000"
	},
	pages: {
		index: {
			entry: "./src/Product/main.js",
			template: "public/index.html",
			title: "Isık AVM"
		},
		admin: {
			entry: "./src/Admin/main.js",
			template: "public/index.html",
			title: "Admin",
			filename: "admin/index.html"
		}
	},
	chainWebpack(config) {
		// set svg-sprite-loader
		config.module
			.rule("svg")
			.exclude.add(resolve("src/Admin/icons"))
			.end();
		config.module
			.rule("icons")
			.test(/\.svg$/)
			.include.add(resolve("src/Admin/icons"))
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "icon-[name]"
			})
			.end();
	}
};
