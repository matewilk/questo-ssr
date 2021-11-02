const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const HtlmWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const commonConfig = require("./webpack.common");

const config = {
  devtool: "source-map",
  entry: [
    "@babel/polyfill",
    "./src/newrelic-browser-agent.js",
    "./src/client/client.tsx",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },

  plugins: [
    // pass .env vars to the bundle
    // specifically to NR agent script
    new Dotenv({
      path: './.env'
    }),
    // Used for NewRelic browser agent instrumentation
    // to inject the agent script to the document header
    new HtlmWebpackPlugin({
      // by default this plugin creates index.html file
      // we don't want it as it is being bundled inside "public"
      // and the app on the root path is trying to display it
      // instead of using /src/helpers/renderer.tsx
      filename: "ignoreme.html",
    }),
  ],
};

module.exports = merge(commonConfig, config);
