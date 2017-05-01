# Testing
To run tests, Webpack needs to create a bundle before the tests can run, also have to generate sourcemaps to know where your code is failing and to generate code coverage for the original source files.<br>
Leaving webapck will bring a boost in performance.

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

describe('clockComponent.js', () => {

  const dom = new JSDOM('');
  global.window = dom.window;
  const $ = require('jquery');
  const clockComponent = require('../../src/js/clockComponent');
  const clockElement = clockComponent.default();

  it('should be a div', (done) => {
    expect(clockElement.get(0).tagName).to.be.equal('DIV');
    done();
  });

  it('should have an id: clock', (done) => {
    expect(clockElement.attr('id')).to.be.equal('clock');
    done();
  });

  it('should have a class: clock', (done) => {
    expect(clockElement.attr('class')).to.be.equal('clock');
    done();
  });

});
```

Add test scripts to `package.json`
```json
scripts: {
  ...
  "prebuild": "npm run test",
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
