/**
 * @class NoRxdNoStockCreatedErrorbFound
 * @desc throws when stock cannot be created
 */
export class NoStockCreatedError extends Error {
  constructor(e = { message: '' }, stock = {}) {
    super(e);
    this.title = 'Stock could not be created';
    this.code = 'NoStockCreatedError';
    this.params = stock;
    this.message = `Stock ${JSON.stringify(
      stock
    )} could not be created. Please, check extra info: ${e.message}`;
  }
}
