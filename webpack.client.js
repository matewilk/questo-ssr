const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

const commonConfig = require("./webpack.common");

const config = {
  devtool: "source-map",
  entry: ["@babel/polyfill", "./src/client/client.tsx"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },

  plugins: [
    new Dotenv({
      path: "./.env",
    }),
    new webpack.DefinePlugin({
      "process.env.QUESTO_SSR_WS_URL": JSON.stringify(
        process.env.QUESTO_SSR_WS_URL
      ),
    }),
  ],
};

module.exports = merge(commonConfig, config);
