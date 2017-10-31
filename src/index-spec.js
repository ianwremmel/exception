'use strict';

const {assert} = require(`chai`);

/* eslint-env mocha */
/* eslint-disable require-jsdoc */

const Exception = require(`.`);

describe(`Exception`, () => {
  it(`subclasses Error`, () => {
    assert.instanceOf(new Exception(), Error);
  });

  it(`has a stacktrace`, () => {
    assert.property(new Exception(), `stack`);
  });

  it(`stringifies as "Exception" and not "Error"`, () => {
    const e = new Exception();
    assert.match(e, /Exception/);
  });

  it(`stringifies with its message`, () => {
    const e = new Exception(`Something bad happened`);
    assert.match(e, /Exception: Something bad happened/);
  });

  it(`stringifies according to its derived class name`, () => {
    class MyException extends Exception {}
    const e = new MyException();
    assert.match(e, /MyException/);

    const e2 = new MyException(`Something worse happened`);
    assert.match(e2, /MyException: Something worse happened/);
  });
});
