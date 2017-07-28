import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

import paths from "./paths";

// Note: defined here because it will be used more than once.
const cssFilename = "bundle.css";

export const devConfig: webpack.Configuration = {
  entry: [
    "babel-polyfill",
    paths.appIndexTsx,
  ],
  devtool: "cheap-eval-source-map",
  output: {
    path: paths.appDev,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: "tsconfig.dev.json",
            },
          },
        ],
      },
    ],
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
  ],
};

export default devConfig;
