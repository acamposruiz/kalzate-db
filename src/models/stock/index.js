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
import schema from 'models/stock/schema';
import { DEFAULT_LIMIT_AMOUNT } from 'models/stock/config';

class Stock {
  //   static QUERIES = {
  //     MORE_SOLD: { order: 'times_sold', desc: true },
  //     MORE_EXPENSIVE: {},
  //     LAST_SOLD: { order: 'last_sold_date', desc: true },
  //     BY_WOMEN: { where: 'category == "women"' },
  //     BY_MEN: { where: 'category == "women"' },
  //     BY_CHILDREN: { where: 'category == "children"' },
  //     ALL: {},
  //   };
  defaults = [];

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
  async init() {
    const stockFound = await this.collection.find().exec();
    return size(stockFound) ? stockfound : this.defaults;
  }
  async create(stock) {
    return isArray(stock)
      ? this.collection.pouch.bulkDocs(stock)
      : this.collection.insert(stock);
  }
  async upsert(stock) {
    return this.collection.atomicUpsert(stock);
  }
  async find(
    { match, limit = DEFAULT_LIMIT_AMOUNT, skip = 0, count = false } = {}
  ) {
    const foundStocks = this.collection
      .find(match)
      .limit(limit)
      .skip(skip)
      .exec();
    if (!count) return foundStocks;
    const totalAmount = new Promise(async (resolve) => {
      const allStocks = await this.collection.find(match).exec();
      resolve(allStocks.length);
    });
    return Promise.all([foundStocks, totalAmount]);
  }
  //   async update(id, Stock) {}
  //   async remove(id) {}
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
  async import(json) {
    return this.collection.importDump(json);
  }

  async export() {
    return this.collection.dump();
  }

}

export default async function (db) {
  // Create or Retrieve collection first
  const collection = db.collections.stock ? db.collections.stock :
    await db.collection({
      name: 'stock',
      schema,
    });
  // Return an Stock instance
  return new Stock(db, collection);
}
