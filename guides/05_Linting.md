# Linting
Install
+ [eslint](https://www.npmjs.com/package/eslint)
  + Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
+ [eslint-loader](https://www.npmjs.com/package/eslint-loader)
  + eslint loader for webpack
+ [babel-eslint](https://github.com/babel/babel-eslint)
  + Allows you to lint ALL valid Babel code with ESLint;
  + Only needed if experimental features not supported in ESLint itself yet.

### Connecting ESLint with Webpack
```
npm install eslint --save-dev
npm install eslint-loader --save-dev
npm install babel-eslint --save-dev
```

Create `.eslintrc.js` file
```javascript
module.exports = {
  "name": "avius",
  "version": "1.0.0",
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['warn'],
    'no-console': 0
  }
};
```

Create `.eslintignore` file
```
node_modules/**
build/**
src/index.html
app/assets/bootstrap/**
```

## Linting Javascript

Add part to `webpack.parts.js`
```javascript
// Ensure that ESLint gets executed before anything else (enforce field),
// so linting happens before any other processing.
exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options
      }
    ]
  }
});
```

Again, in `webpack.parts.js` if you want so see linter warnings and errors in browser
```javascript
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    ...
    // overlay: show captured errors and warnings in browser
    overlay: {
      errors: true,
      warnings: true
    }
  }
});
```

Update `package.json`
```json
"scripts": {
  ...
  "lint:js": "eslint app/ webpack.*.js --cache"
},
```

## Linting CSS
Install
+ [stylelint](https://www.npmjs.com/package/stylelint)
  + A CSS linter that helps you enforce consistent conventions and avoid errors in your stylesheets;
+ [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)
  + The standard shareable config for stylelint;
+ [postcss-loader](https://www.npmjs.com/package/postcss-loader)
  + post processes CSS with PostCSS plugins.

```
npm install stylelint --save-dev
npm install stylelint-config-standard --save-dev
npm install postcss-loader --save-dev
```

Create `.stylelintrc`
```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "color-hex-case": "lower"
  }
}
```

In `webpack.parts.js`:
```javascript
// lint CSS with Stylelint through postcss-loader.
exports.lintCSS = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'postcss-loader',
        options: {
          plugins: () => ([
            require('stylelint')({
              // Ignore node_modules CSS
              ignoreFiles: 'node_modules/**/*.css'
            })
          ])
        }
      }
    ]
  }
});
```

In `webpack.common.js`
```javascript
...
parts.lintCSS({ include: parts.paths.app }),
```

Add to scripts in `package.json`
```json
"scripts": {
  "lint:style": "stylelint app/assets/css/*.css"
  ...
},
```
