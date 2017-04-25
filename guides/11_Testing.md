# Testing

## Unit Tests
Install:
+ [mocha]
+ [chai]
+ [jsdom]
```
npm install mocha --save-dev
npm install chai --save-dev
npm install jsdom --save-dev
```

In `eslintrc`, tell linter to parse _**mocha**_
```
env: {
  ...
  mocha: true
},
```

Create a conguration file for our tests `tests/setup.js`
```javascript
// This file isn't transpiled, so must use CommonJS and ES5

// Register babel to transpile before our tests run.
require('babel-register')();

// Disable webpack features that Mocha doesn't understand.
require.extensions['.css'] = function() {};
```

Create a test `tests/index.html.test.js`
```javascript
import { expect } from 'chai';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

describe('Our exemple test', () => {

  it('should pass', () => {
    expect(true).to.equal(true);
  });

});

describe('index.html', () => {

  const options = {};

  it('should have an empty body', (done) => {
    JSDOM.fromFile('./src/index.html', { options }).then(dom => {
      const body = dom.window.document.getElementsByTagName('body')[0];
      expect(body.innerHTML).to.be.equal('\n\n\n');
    }).then(done, done); // fix the timeout problem
  });

});

/*
Timeout problem fix:
Chain a .then(done,done) after the promise.
The first ‘done’ will signal the completion of a successful test to mocha.
The second done is called in case of a promise rejection.
This is the safest style to use with the ‘done’ callback:
Your test failures are caught and displayed.
When you forget to supply ‘done’ as argument, you will get done is not defined.
If you forget to end your test with .then(done,done), mocha warns you about a missing ‘done’.
*/
```

Add test scripts to `package.json`
```json
scripts: {
  ...
  "test": "mocha --reporter progress tests/setup.js \"tests/**/*.test.js\"",
  "test:watch": "npm run test -- --watch"
}
```

## Integration Tests
Not yet implemented

#### run our tests
```
npm rnu test
```
