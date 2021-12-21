const path = require("path");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "@babel/preset-react",
            // 'stage-0',
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 versions"] },
              },
            ],
          ],
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            options: {
              reportFiles: ["src/**/*.{ts,tsx}"],
            },
            loader: "ts-loader",
          },
        ],
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".react.js", ".ts", ".tsx"],
  },
};
