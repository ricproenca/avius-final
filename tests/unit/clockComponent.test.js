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
