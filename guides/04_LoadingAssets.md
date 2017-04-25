# Loading Assets

## Loading Javascript
Webpack processes ES6 module definitions by default and transforms them into code.<br>
It does not transform ES6 specific syntax apart, such as const.<br>
You can use Babel with webpack through babel-loader.<br>
Connecting Babel with a project allows you to process webpack configuration through it.

### Install
+ [babel-core](https://www.npmjs.com/package/babel-core)
  + Babel compiler core.;
+ [babel-loader](https://www.npmjs.com/package/babel-loader)
  + Transpiling JavaScript files using Babel and webpack;
+ [babel-preset-latest](https://www.npmjs.com/package/babel-preset-latest)
  + Babel preset including es2015, es2016, es2017;
```
npm install babel-core --save-dev
npm install babel-loader --save-dev
npm install babel-preset-latest --save-dev
```

Define a part for Babel in `webpack.parts.js`
```javascript
// Connecting Babel with webpack through babel-loader
exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        loader: 'babel-loader',
        options: {
          // Enable caching for improved performance during development.
          cacheDirectory: true,
        },
      },
    ],
  },
});
```

Adjust `webpack.common.js` as below:
```javascript
  ...
  parts.loadJavaScript({ include: parts.paths.src }),
]);
```

## Setting Up `.babelrc`
```
{
  "presets": [ "latest" ]
}
```
# Loading CSS

## Install
* [css-loader](https://github.com/webpack-contrib/css-loader)
  * Goes through possible @import and url() lookups within the matched files and treats them as a regular ES6 import.
* [style-loader](https://github.com/webpack-contrib/style-loader)
  * Injects the styling through a style element.

```
npm install css-loader --save-dev
npm install style-loader --save-dev
```

Add a part to `webpack.parts.js`
```javascript
// To load CSS, you need to use css-loader and style-loader.
// css-loader goes through possible @import and url() lookups within the matched files and treats them as a regular ES6 import.
// style-loader injects the styling through a style element.
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
```

Adjust `webpack.dev.js` as below:
```javascript
...
},
parts.loadCSS()
```

# Generate CSS bundles
Install
+ [extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin) plugin:
  + Marks the assets to be extracted.
```
npm install extract-text-webpack-plugin --save-dev
```

Add a part `webpack.parts.js`:

```javascript
const ExtractTextPlugin = require('extract-text-webpack-plugin');
...
// CSS bundles generation using ExtractTextPlugin.
// It can aggregate multiple CSS files into one.
// The plugin then picks up the result aggregated by the loader and emits a separate file.
exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].css'
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: plugin.extract({
            use,
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [ plugin ]
  };
};
```

## Autoprefixing
It can be difficult to remember which vendor prefixes you have to use for specific CSS rules to support a large variety of users.<br>
Autoprefixing solves this problem.

Install
+ [postcss-loader](https://www.npmjs.com/package/postcss-loader)
  + PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.<br>
  + Recommended by Google and used in Twitter and Taobao.
+ [autoprefixer](https://www.npmjs.com/package/autoprefixer)
  + Write your CSS rules without vendor prefixes (in fact, forget about them entirely);

```
npm install postcss-loader -save-dev
npm install autoprefixer --save-dev
```

In `webpack.parts.js`, code:
```javascript
// Working with Autoprefixer is simple:
// just forget about vendor prefixes and write normal CSS according to the latest W3C specs.
exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')
    ])
  }
});
```

Add to `webpack.prod.js`:
```javascript
parts.extractCSS({
  use: ['css-loader', parts.autoprefix()]
}),
```
## Purify CSS
+ [glob](https://www.npmjs.com/package/glob)
  + Match files using the patterns the shell uses;
+ [purifycss-webpack](https://www.npmjs.com/package/purifycss-webpack)
  + In the official example of the project, they purify and minify Bootstrap (140 kB) in an application using ~40% of its selectors to mere ~35 kB;

Install
```
npm install glob --save-dev
npm install purifycss-webpack --save-dev
```

In `webpack.parts.js`, code:
```javascript
const PurifyCSSPlugin = require('purifycss-webpack');
...
// Remove unused selectors from your CSS.
// You should use it with the extract-text-webpack-plugin.
exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({ paths })
  ]
});
```

In `webpack.prod.js`, code:
```javascript
const glob = require('glob');
...
parts.purifyCSS({
  paths: glob.sync(`${parts.paths.src}/**/*.js`, { nodir: true })
})
```

# Loading Images

Install:
* [url-loader](https://github.com/webpack-contrib/url-loader)
  * Emits your images as base64 strings within your JavaScript bundles.
* [file-loader](https://github.com/webpack-contrib/file-loader)
  * Outputs image files and returns paths to them instead of inlining.

```
npm install file-loader --save-dev
npm install url-loader --save-dev
```

Add part to `webpack.parts.js`
```javascript
// Inline assets by using url-loader.
// It emits images as base64 strings within your JavaScript bundles.
// Decreases the number of requests needed while growing the bundle size.
// Perfect for development.
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options
        }
      }
    ]
  }
});

// Stores separate images to files.
// Perfect for production.
exports.extractImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif)$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options
        }
      }
    ]
  }
});
```

In our development configuration, `webpack.dev.js` add this line
```javascript
...
parts.loadImages()
```
In our production build,  `webpack.prod.js` add these lines,
```javascript
...
parts.extractImages({
  options: {
    name: './images/[name].[ext]',
    publicPath: '../' // override the default per loader definition
  }
}),
```

# Loading Fonts
Loading fonts is similar to loading images. You can still use url-loader and file-loader as with images.<br>

Add a part to `webpack.parts.js`
```javascript
// Supports Multiple Formats using file-loader
// It's a trade-off as you get extra requests, but perhaps it's the right move.
exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options
        }
      }
    ]
  }
});
```

`webpack.common.js`
```javascript
...
parts.loadFonts({
  options: {
    name: './fonts/[name].[ext]',
    publicPath: '../' // override the default per loader definition
  }
})
```

### Font Awesome

Install [font-awesome](https://www.npmjs.com/package/font-awesome):
```
npm install font-awesome --save
```

# Source Maps
The easy way to enable source maps in Webpack is by wrapping the core idea within a configuration part.
Add a source map generator to `webpack.parts.js`
```javascript
exports.generateSourceMaps = ({ type }) => ({
  devtool: type
});
```

 Webpack recommends cheap-module-source-map with output.devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]' as it's a good compromise between speed and quality while working reliably in Chrome and Firefox browsers.

`webpack.dev.js`
```javascript
...
{
  output: {
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  }
},
parts.setFreeVariable('process.env.NODE_ENV', 'production'),
parts.generateSourceMaps({ type: 'cheap-module-source-map' }),
...
```

`webpack.prod.js`
```javascript
...
parts.generateSourceMaps({
  type: 'source-map'
}),
```
