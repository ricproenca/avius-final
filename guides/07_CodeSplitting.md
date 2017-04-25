# Code Splitting and Lazy Loading
Install:
+ [babel-plugin-syntax-dynamic-import](https://www.npmjs.com/package/babel-plugin-syntax-dynamic-import)
  + Allow parsing of import();
```
npm install babel-plugin-syntax-dynamic-import --save-dev
```

## Configuring Babel
Add plugin to `.babelrc`
```json
{
  ...
  "plugins": ["syntax-dynamic-import"]
}
```

In `index.js` file, uncomment the code:
```javascript
setTimeout(() => {
  import('./src/clockComponent.lazy.js').then((lazyClock) => {
    clearTimeout(runClock);
    lazyClock(clockElement);
  }).catch((err) => {
    console.error(err);
  });
}, 10000);
```
