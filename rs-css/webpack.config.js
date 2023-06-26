const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const baseConfig = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.ts"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.ts/,
        use: "ts-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|svg|ico)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      favicon: path.resolve(__dirname, "./src/assets/favicon.png"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/",
          to: "assets",
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode ? require("./webpack.prod.config") : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};
