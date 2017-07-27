import * as webpack from "webpack";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

import paths from "./paths";

// Note: defined here because it will be used more than once.
const cssFilename = "index.css";

const raw = Object.keys(process.env)
  // .filter(key => REACT_APP.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: process.env.NODE_ENV || 'development',
    }
  );
// Stringify all values so we can feed into Webpack DefinePlugin
const stringified = {
  'process.env': Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key]);
    return env;
  }, {}),
};

export const devConfig: webpack.Configuration = {
  entry: [
    paths.indexTs,
  ],
  // devtool: "cheap-eval-source-map",
  output: {
    path: paths.appDist,
    filename: "index.js",
    library: "RFetch",
    libraryTarget: "umd",
  },
  externals: {
    "antd": {
      commonjs: "antd",
      commonjs2: "antd",
      amd: "antd",
      root: "antd",
    },
    "react": {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "react",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "react-dom",
    },
  },
  plugins: [
    new webpack.DefinePlugin(stringified),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      // output: {
      //   comments: false,
      //   // Turned on because emoji and regex is not minified properly using default
      //   // https://github.com/facebookincubator/create-react-app/issues/2488
      //   ascii_only: true,
      // },
      sourceMap: true,
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
  ],
};

export default devConfig;
