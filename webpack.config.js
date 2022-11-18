const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const CSS_REGEX = /\.css$/i;
const CSS_MODULE_REGEX = /\.module\.css$/;
const ASSET_REGEX = /\.(png|svg|jpg|jpeg|gif)$/i;
const TSX_REGEX = /\.tsx?$/;

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    static: "./public",
  },
  optimization: {
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        test: TSX_REGEX,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: CSS_REGEX,
        exclude: CSS_MODULE_REGEX,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: CSS_MODULE_REGEX,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: ASSET_REGEX,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        // safe: true,
        discardComments: {
          removeAll: true,
        },
      },
    }),
  ],
};
