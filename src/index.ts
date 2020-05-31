const originals = new WeakMap<Exception, Error>();

/**
 * Base class from which to extend Exceptions. Nearly identical in use to
 * {@link Error} but provides a few workarounds to make inheriting from
 * {@link Error} easier
 *
 * @class Exception
 * @extends {Error}
 */
export class Exception extends Error {
  /**
   * Getter
   */
  get original(): Error | undefined {
    return originals.get(this);
  }

  /**
   * Setter
   */
  set original(value: Error | undefined) {
    if (value) {
      originals.set(this, value);
    }
    else {
      originals.delete(this);
    }
  }

  /**
   * Constructor
   * @param message - Human-readable description of the error or error or Error
   * to rethrow
   */
  constructor(message?: string | Error) {
    if (message instanceof Error) {
      super(`Wrapped Exception: ${message.message}`);
      this.original = message;
      this.stack = this.original.stack;
    } else {
      super(message);
    }
    this.name = this.constructor.name;
  }
}
