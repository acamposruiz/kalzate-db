/**
 * Use mongo as model
 */
// More sold
// More expensive
// Cheapest Stocks
// Has discount (offer)
// last sold
// Cat Women
// Cat Men
// Cat Children
// All
import { isRxCollection, isRxDatabase } from 'rxdb';
import { isArray, merge, uniqBy, first } from 'lodash';
import uuidv1 from 'uuid/v1';
import schema from 'models/stock/schema';
import { DEFAULT_LIMIT_AMOUNT } from 'models/stock/config';
import { NoDatabaseFoundError } from 'errors/db';
import {
  NoStockCreatedError,
  NoStockUpdatedError,
  NoStockMatchesFoundError,
} from 'errors/stock';
export class Stock {
  //   static queries = {
  //     MORE_SOLD: { order: 'times_sold', desc: true },
  //     MORE_EXPENSIVE: {},
  //     LAST_SOLD: { order: 'last_sold_date', desc: true },
  //     BY_WOMEN: { where: 'category == "women"' },
  //     BY_MEN: { where: 'category == "women"' },
  //     BY_CHILDREN: { where: 'category == "children"' },
  //     ALL: {},
  //   };
  defaults = { limit: DEFAULT_LIMIT_AMOUNT, skip: 0 };

  constructor(db, collection) {
    if (!isRxDatabase(db)) {
      throw new Error('A valid RxDatabase is required!');
    }
    if (!isRxCollection(collection)) {
      throw new Error('A valid RxCollection is required!');
    }
    this.db = db;
    this.collection = collection;
  }

  /**
   * @method create
   * Cretes a new stock document
   * @param {array|object} stock/s item/s
   * @param {object} options
   */
  async create(stock, options) {
    try {
      return await (isArray(stock)
        ? this.createBatch(stock, options)
        : this.createOne(stock, options));
    } catch (e) {
      throw new NoStockCreatedError(e, stock);
    }
  }

  /**
   * @method update
   * This updates an stock item. it has to exists and fit the schema
   * @param {object} stock
   */
  async update(stock = {}) {
    try {
      await this.fetchById(stock);
      // @todo Should we return this.upsert or await this.upsert ?
      return await this.upsert(stock);
    } catch (e) {
      throw new NoStockUpdatedError(e, stock);
    }
  }

  /**
   * @method increaseAmount
   * This updates an stock item amount by increasing it. it has to exists and fit the schema
   * @param {object} stock
   */
  async increaseAmount(stock = {}) {
    try {
      const currentStock = await this.fetchById(stock);
      // @todo Should we return this.upsert or await this.upsert ?
      return await this.upsert({ ...stock, amount: first(currentStock).amount + stock.amount });
    } catch (e) {
      throw new NoStockUpdatedError(e, stock);
    }
  }

  /**
   * @method decreaseAmount
   * This updates an stock item amount by decreasing it. it has to exists and fit the schema
   * @param {object} stock
   */
  async decreaseAmount(stock = {}) {
    try {
      const currentStock = await this.fetchById(stock);
      // @todo Should we return this.upsert or await this.upsert ?
      return await this.upsert({ ...stock, amount: first(currentStock).amount - stock.amount });
    } catch (e) {
      throw new NoStockUpdatedError(e, stock);
    }
  }

  /**
   * @method get
   * This fetches the stock items given a filter
   * @param {object} {match, limit, skip, count, sort}
   */
  async get({
    match,
    limit = this.defaults.limit,
    skip = this.defaults.skip,
    count = true,
    sort = { created_at: 'desc' },
  } = {}) {
    const foundStocks = this.collection
      .find(match)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .exec();
    if (!count) return foundStocks;
    const totalAmount = new Promise(async (resolve) => {
      const allStocks = await this.collection.find(match).exec();
      resolve(allStocks.length);
    });
    const [items, total] = await Promise.all([foundStocks, totalAmount]);
    return { items, total, limit, skip };
  }

  /**
   * @method matches
   * This looks for a all stock items maching the field and value given
   * @param {string} field
   * @param {string} value
   */
  async matches(field, value) {
    try {
      if (!value) return { value, items: [] };
      const matches = await this.get({
        match: { [field]: { $regex: new RegExp(`^${value}`) } },
      });
      // return { ...matches, value, items: matches.items.map((i) => i[field]) };
      return { value, items: matches.items.map((i) => i[field]) };
    } catch (e) {
      throw new NoStockMatchesFoundError(e, field, value);
    }
  }

  /**
   * @method remove
   * This removes an item by reference
   * @param {string} reference
   */
  async remove(reference) {
    return this.collection.findOne({ reference: { $eq: reference } }).remove();
  }

  /**
   * @method remove
   * This removes an item by reference
   * @param {string} reference
   */
  async removeAll() {
    await this.collection.remove();
    this.collection = await this.db.collection({
      name: 'stock',
      schema,
    });
  }

  /**
   * @method dump
   * This is a method to export the collection as JSON data
   * @param {boolean} decrypt
   */
  async dump(decrypt = true) {
    return this.collection.dump(decrypt);
  }
  // async query({ select, where, limit, offset, order }) {
  //   return this.collection.find()
  // }
  //   async count({ where }) {}
  //   async paginate({ select, where, limit, order }) {
  //     const count = await this.count({ where });
  // if(count <= limit) yield await this.query({select, where, order});
  // let offset = 0;
  // while (count > offset) {
  //   const { Stocks } = await this.query({ select, where, order, limit, offset });
  //   //   yield Stocks;
  //   offset += limit;
  // }
  //   }
  // async import(json) {
  //   return this.collection.importDump(json);
  // }

  /** ***************************************************** */
  /*                  PRIVATE METHODS                      */
  /** ***************************************************** */

  async createBatch(stock = [], options = {}) {
    if (!stock.length) {
      throw new Error('stock items is empty');
    }

    if (options.remove) {
      await this.removeAll();
    }
    // this.collection.pouch.bulkDocs
    // this.collection.pouch.allDocs
    const createOnePromises = uniqBy(stock, 'reference').map((s) =>
      this.createOne(s, true)
    );
    // const createOnePromises = stock.map((s) => this.createOne(s, true));
    return Promise.all(createOnePromises);
  }

  async createOne(stock = {}, orUpdate = false) {
    if (!stock || !stock.reference || !stock.price || stock.price <= 0) {
      throw new Error('Stock requires reference and price');
    }
    const isStockCreated = await this.collection
      .find({ reference: { $eq: stock.reference } })
      .exec();
    if (!isStockCreated.length) {
      return this.upsert(
        merge(stock, { id: uuidv1(), created_at: new Date().getTime() })
      );
    }
    if (!orUpdate) {
      throw new Error('Stock already exists');
    }
    return this.upsert(
      merge(stock, {
        id: isStockCreated[0].id,
        created_at: isStockCreated[0].created_at,
        amount: (isStockCreated[0].amount || 0) + (stock.amount || 0),
      })
    );
  }

  async upsert(stock) {
    return this.collection.atomicUpsert(stock);
  }

  async fetchById(stock) {
    if (!stock || !stock.id) {
      throw new Error('Stock requires an id field to be updated');
    }
    // Remove find check to allow creating a new stock if it does not exist
    const currentStock = await this.collection
      .find({ id: { $eq: stock.id } })
      .exec();
    if (!currentStock.length) {
      throw new Error('Stock to be updated does not exists');
    }
    return currentStock;
  }
}

export default async function (db) {
  if (!db) throw new NoDatabaseFoundError();
  // Create or Retrieve collection first
  const collection = db.collections.stock
    ? db.collections.stock
    : await db.collection({
      name: 'stock',
      schema,
    });
  // Return an Stock instance
  return new Stock(db, collection);
}
