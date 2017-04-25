import { expect } from 'chai';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

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
