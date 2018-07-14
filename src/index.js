'use strict';

const originals = new WeakMap();

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
   * Getter
   * @returns {Error|undefined}
   */
  get original() {
    return originals.get(this);
  }

  /**
   * Setter
   * @param {Error|undefined} value;
   */
  set original(value) {
    originals.set(this, value);
  }

  /**
   * Constructor
   * @param {string|Error} [message] - Human-readable description of the error.
   */
  constructor(message) {
    if (message instanceof Error) {
      super(`Wrapped Exception: ${message.message}`);
      this.original = message;
      this.stack = this.original.stack;
    }
    else {
      super(message);
    }
    this.name = this.constructor.name;
  }
}

exports.Exception = Exception;
