# Webpack Setup

## Install
+ [nodemon](https://github.com/remy/nodemon)
  + Monitor for any changes in your node.js application and automatically restart the server;
+ [webpack](https://webpack.github.io/)
  + A bundler for javascript and friends;
  + Packs many modules into a few bundled assets;
+ [webpack-merge](https://www.npmjs.com/package/webpack-merge)
  + Configuration composition by merging for better readability;
+ [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
  + Serves a webpack app;
  + Updates the browser on changes;
+ [HtmlWebpackPlugin](https://www.npmjs.com/package/html-webpack-plugin)
  + simplifies the creation of HTML files to serve your webpack bundles;
+ [WatchIgnorePlugin](https://survivejs.com/webpack/developing/automatic-browser-refresh/)
  + Sometimes the file watching setup provided by WDS won't work on your system;
  + It can be problematic on older versions of Windows, Ubuntu, Vagrant, and Docker;
  + Enabling polling is a good option;
+ [CleanWebpackPlugin](https://github.com/johnagan/clean-webpack-plugin)
  + A webpack plugin to remove your build folder(s) before building
```
npm install nodemon --save-dev
npm install webpack --save-dev
npm install webpack-merge --save-dev
npm install webpack-dev-server --save-dev
npm install html-webpack-plugin --save-dev
npm install watch-ignore-webpack-plugin --save-dev
npm install clean-webpack-plugin --save-dev
```

## Prepare webpack configuration files:
In project root, create the files:
* _`webpack.parts.js`_ - helpers file;
* _`webpack.common.js`_ - common config file;
* _`webpack.dev.js`_ - development config file;
* _`webpack.prod.js`_ - production config file;

`webpack.parts.js` content:
```javascript
const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

// Set paths for source and build folder
const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};
exports.paths = PATHS;

// Control environment variables
exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);
  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};

// Delete build folder before building
exports.clean = (path) => ({
  plugins: [
    new CleanWebpackPlugin([path])
  ]
});

// WDS - Webpack Development Configuration
// If you access through http://localhost:8080/webpack-dev-server/, WDS provides status information at the top.
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    // Enable history API fallback so HTML5 History API based routing works.
    historyApiFallback: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    // Parse host and port from env to allow customization.
    // If you use Docker, Vagrant or Cloud9, set  host: options.host || '0.0.0.0';
    host: host, // Defaults to `localhost`
    port: port, // Defaults to 8080

    // If you get errors with older versions of Windows, Ubuntu, Vagrant, and Docker, uncomment the following lines

/*  watchOptions: {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,
      // Poll using interval (in ms, accepts boolean too)
      poll: 1000,
    },
    plugins: [
      // Ignore node_modules, so CPU usage with poll watching, drops significantly.
      new webpack.WatchIgnorePlugin([
        path.join(__dirname, 'node_modules')
      ]),
    ]*/
  }
});
```

`webpack.common.js` content:
```javascript
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge([
  {
    // The entry point for the bundle. Entries have to resolve to files!
    // If a directory contains *index.js*, it resolves to that.
    entry: {
      app: parts.paths.src
    },
    // Set of options instructing webpack on how and where it should output
    // the bundles, assets and anything else you bundle or load with webpack.
    output: {
      path: parts.paths.build,
      filename: '[name].js'
    },
    // Use plugins to add functionality typically related to bundles in webpack.
    plugins: [
      // Simplifies creation of HTML files to serve your webpack bundles.
      // Useful for webpack bundles that include a hash in the filename which changes every compilation.
      new HtmlWebpackPlugin({
        title: 'Avius'
      })
    ]
  }
]);
```

`webpack.dev.js` content:
```javascript
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const commonConfig = require('./webpack.common');

const developmentConfig = merge([
  parts.setFreeVariable('process.env.NODE_ENV', 'production'),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
]);

module.exports = () => {
  return merge(commonConfig, developmentConfig);
};
```

`webpack.prod.js` content:
```javascript
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const commonConfig = require('./webpack.common');

const productionConfig = merge([
  parts.setFreeVariable('process.env.NODE_ENV', 'production'),
  parts.clean(parts.paths.build)
]);

module.exports = () => {
  return merge(commonConfig, productionConfig);
};
```

## Prepare `package.json` to run development and production configuration files
WDS will handle restarting the server when you change a bundled file, but what about when you edit the webpack config?<br>
We will set `nodemon` to watch for changes in webpack files to restart the development server.

```json
"scripts": {
  "start": "nodemon --watch webpack.*.js --exec \"webpack-dev-server --config webpack.dev.js --progress --color\"",
  "build": "webpack --config webpack.prod.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

## Run development server
```
npm run start
```

Access your page through http://localhost:8080/ at your browser.<br>
At http://localhost:8080/webpack-dev-server/, WDS provides status information at the top.

#### At this point, you will see lots of errors.
Next chapter will sove that by adding the appropriate loaders...
