import { expect } from 'chai';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

describe('index.html', () => {

  const options = {};

  it('should have an empty body', (done) => {
    JSDOM.fromFile('./src/index.html', { options }).then(dom => {

      global.window = dom.window;
      const $ = require('jquery');

      expect($('body').html()).to.be.equal('');

    }).then(done, done); // fix the timeout problem

  });

});
