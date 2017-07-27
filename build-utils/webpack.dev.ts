import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

import paths from "./paths";

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
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
  ],
};

export default devConfig;
