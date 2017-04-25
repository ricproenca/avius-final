# Optimizing

## Performance Budget
Performance budget can be configured to provide warnings or errors.<br>
If a budget isn't met and it has been configured to emit an error, it would terminate the entire build.<br>
To integrate the feature into the project, adjust the configuration in `webpack.prod.js`
```javascript
output: {
  chunkFilename: './js/[name].[chunkhash:8].js',
  filename: './js/[name].[chunkhash:8].js'
},
performance: {
  hints: 'warning', // 'error' or false are valid too
  maxEntrypointSize: 100000, // in bytes
  maxAssetSize: 450000 // in bytes
},
plugins: [
  new webpack.HashedModuleIdsPlugin()
]
```

## Minifying JavaScript
Install:
+ [babili-webpack-plugin ]()
  + Maintained by Babel team and provides support for ES6 and newer features.
```
npm install babili-webpack-plugin --save-dev
```

Define a part for it first in `webpack.parts.js`
```javascript
const BabiliPlugin = require('babili-webpack-plugin');
...
// UglifyJS doesn't support ES6 syntax yet making it problematic if Babel and babel-preset-env are used while targeting specific browsers.
// So, the best choice is using babili.
exports.minifyJavaScript = () => ({
  plugins: [
    new BabiliPlugin()
  ]
});
```

Hook it up in `webpack.prod.js`
```javascript
...
parts.clean(PATHS.build),
parts.minifyJavaScript(),
...
```
#### [uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin) it's also a excellent choice.<br>It allows you to try out an experimental version of UglifyJS that provides better support for ES6 than the stable version.

## Minifying CSS
Install:
+ [cssnano](https://www.npmjs.com/package/cssnano)
  + Modular minifier that aims to utilise small modules from the PostCSS ecosystem;
+ [optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)
  + Search for CSS assets during the Webpack build and will optimize/minimize the CSS (using by default cssnano);
```
npm install cssnano --save-dev
npm install optimize-css-assets-webpack-plugin --save-dev
```

In a configuration part (`webpack.parts.js`)
```javascript
const cssnano = require('cssnano');
...
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
...
// OptimizeCSSAssetsPlugin avoids duplicated CSS by operating on the generated result and thus can lead to a better result.
// The best choice.
exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false
    })
  ]
});
```

Then, connect with main configuration (´webpack.config.js`)
```javascript
...
parts.minifyJavaScript({ useSourceMap: true }),
parts.minifyCSS({
  options: {
    discardComments: {
      removeAll: true
    },
    // Run cssnano in safe mode to avoid potentially unsafe transformations.
    safe: true
  }
}),
```
## Minifying HTML
If you consume HTML templates through your code using [html-loader](https://www.npmjs.com/package/html-loader), you can preprocess it through [posthtml](https://www.npmjs.com/package/posthtml) with [posthtml-loader](https://www.npmjs.com/package/posthtml-loader).<br>
You can use [posthtml-minifier](https://www.npmjs.com/package/posthtml-minifier) to minify your HTML through it.

## Attaching a Revision to the Build
Install
+ [git-revision-webpack-plugin](https://github.com/pirelenito/git-revision-webpack-plugin):
  + Generates VERSION and COMMITHASH files during build based on a local git repository.
```
npm install git-revision-webpack-plugin --save-dev
```

In `webpack.parts.js`, add
```javascript
const GitRevisionPlugin = require('git-revision-webpack-plugin');
...
// Generates a small comment at the beginning of the generated files.
exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version()
    })
  ]
});
```

Connect it to `webpack.prod.js`:

```javascript
  parts.clean(PATHS.build),
  parts.attachRevision(),
  ...
```
