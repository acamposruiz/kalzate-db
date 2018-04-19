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
import { isRxCollection, isRxDatabase, RxQuery } from 'rxdb';
import { isArray, size } from 'lodash';
import uuidv1 from 'uuid/v1';
import schema from 'models/stock/schema';
import { DEFAULT_LIMIT_AMOUNT } from 'models/stock/config';
import { NoDatabaseFoundError } from 'errors/db';
import { NoStockCreatedError } from 'errors/stock';
export class Stock {
  //   static QUERIES = {
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

  // async create(stock) {
  //   return isArray(stock)
  //     ? this.collection.pouch.bulkDocs(stock)
  //     : this.collection.insert(stock);
  // }

  async createBatch(stock, options) {
    return this.collection.importDump(stock);
  }

  async create(stock = {}, options = {}) {
    try {
      // if (options.batch === true) {
      //   return this.createBatch(stock, options);
      // }
      if (!stock || !stock.reference || !stock.price || stock.price <= 0) {
        throw new Error('Stock requires reference and price');
      }
      const isStockCreated = await this.collection
        .find({ reference: { $eq: stock.reference } })
        .exec();
      if (isStockCreated.length) throw new Error('Stock already exists');
      stock.id = uuidv1();
      stock.created_at = new Date().getTime();
      return await this.upsert(stock);
    } catch (e) {
      throw new NoStockCreatedError(e, stock);
    }
  }

  async upsert(stock) {
    return this.collection.atomicUpsert(stock);
  }

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

  //   async update(id, Stock) {}
  async remove(reference) {
    return this.collection.findOne({ reference: { $eq: reference } }).remove();
  }

  async export(decrypt = true) {
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

  // async export() {
  //   return this.collection.dump();
  // }
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
