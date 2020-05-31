'use strict';

const {assert} = require('chai');

/* eslint-env mocha */
/* eslint-disable require-jsdoc */

const {Exception} = require('.');

describe('Exception', () => {
  it('subclasses Error', () => {
    assert.instanceOf(new Exception(), Error);
  });

  it('has a stacktrace', () => {
    assert.property(new Exception(), 'stack');
  });

  it('stringifies as "Exception" and not "Error"', () => {
    const e = new Exception();
    assert.match(e.toString(), /Exception/);
  });

  it('stringifies with its message', () => {
    const e = new Exception('Something bad happened');
    assert.match(e.toString(), /Exception: Something bad happened/);
  });

  it('stringifies according to its derived class name', () => {
    class MyException extends Exception {}
    const e = new MyException();
    assert.match(e.toString(), /MyException/);

    const e2 = new MyException('Something worse happened');
    assert.match(e2.toString(), /MyException: Something worse happened/);
  });

  it('captures and forwards Errors', () => {
    const e = new Error('foo');

    const ex = new Exception(e);

    assert.match(ex.toString(), /Exception: Wrapped Exception: foo/);
    assert.equal(ex.stack, e.stack);
  });
});
/* eslint-enable require-jsdoc */
