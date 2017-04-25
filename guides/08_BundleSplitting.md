# Bundle Splitting
With bundle splitting, you can push the vendor dependencies to a bundle of their own and benefit from client level caching.<br>
This can be done in such a way that the whole size of the application remains the same.<br>
Given there are more requests to perform, there's a slight overhead.<br>
But the benefit of caching makes up for this cost.<br>

## Generate vendor bundles
A quick example is, instead of having app.js (100 kB), you could end up with app.js (10 kB) and vendor.js (90 kB).<br>
Now, changes made to the application are cheap for the clients that have already used the application earlier.

We'll use [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)

Add a part to `webpack.parts.js`
```javascript
const webpack = require('webpack');
...
// Extract vendor related code to a bundle of its own.
// Allows multiple splits through it:
exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  ))
});
```

`webpack.common.js`
```javascript
entry: {
  ...
  vendor: ['jquery', 'moment']
},
...
parts.extractBundles([{
  name: 'vendor',
  minChunks: ({ resource }) => (
    resource &&
    resource.indexOf('node_modules') >= 0 &&
    resource.match(/\.js$/)
    )
  }
}])
```

## Adding Hashes to Filenames
Cache invalidation can be achieved by including a hash to filenames.

Add hash to filenames:

`webpack.parts.js`
```javascript
exports.extractCSS = ({ include, exclude, use }) => {
  const plugin = new ExtractTextPlugin({
    filename: './css/[name].[contenthash:8].css',
    publicPath : '../'
  });
...
```

`webpack.common.js`
```javascript
parts.loadFonts({
  ...
  name: './fonts/[name].[hash:8].[ext]',
  publicPath : '../'
```

`webpack.prod.js`
```javascript
...
{
  output: {
    chunkFilename: './js/[name].[chunkhash:8].js',
    filename: './js/[name].[chunkhash:8].js'
  }
},
...
parts.extractImages({
  options: {
    name: './images/[name].[hash:8].[ext]',
    publicPath: '../' // override the default per loader definition
  }
}),
```

## Enabling HashedModuleIdsPlugin
Add plugin to production config `webpack.prod.js`
```javascript
const webpack = require('webpack');
  {
    ...
    maxAssetSize: 450000 // in bytes
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ]
  ...
]);
```
## Extracting a Manifest
To extract the manifest, a single change is required to capture the remaining code which contains webpack bootstrap:
`webpack.common.js`
```javascript
...
  parts.extractBundles([
      {
        ...
      },
      {
        name: 'manifest',
        minChunks: Infinity
      }
  ])
  ```

  #### Try adjusting `index.js` and see how the hashes change.<br>This time around it should not invalidate the vendor bundle, and only the manifest and app bundle names should become different.
