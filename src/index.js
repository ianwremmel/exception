'use strict';
/**
 * Base class from which to extend Exceptions. Nearly identical in use to
 * {@link Error} but provides a few workarounds to make inheriting from
 * {@link Error} easier
 *
 * @class Exception
 * @extends {Error}
 */
class Exception extends Error {
  /**
   * Constructor
   * @param {string} [message] - Human-readable description of the error.
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

exports.Exception = Exception;
