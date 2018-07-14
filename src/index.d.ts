/**
 * Base class from which to extend Exceptions. Nearly identical in use to
 * {@link Error} but provides a few workarounds to make inheriting from
 * {@link Error} easier
 *
 * @class Exception
 * @extends {Error}
 */
export class Exception extends Error {
  original?: Error;

  /**
   * Constructor
   * @param {string} [message] - Human-readable description of the error.
   */
  constructor(message?: string)

  /**
   * Constructor
   * @param {Error} original - Error to rethrow
   */
  constructor(original: Error)
}
