/**
 * Use mongo as model
 */
// More sold
// More expensive
// Cheapest items
// Has discount (offer)
// last sold
// Cat Women
// Cat Men
// Cat Children
// All
import { isRxCollection, isRxDatabase, RxQuery } from 'rxdb';
import { isArray } from 'lodash';
import schema from 'models/items/schema';
import { DEFAULT_LIMIT_AMOUNT } from 'models/items/config';

class Item {
  //   static QUERIES = {
  //     MORE_SOLD: { order: 'times_sold', desc: true },
  //     MORE_EXPENSIVE: {},
  //     LAST_SOLD: { order: 'last_sold_date', desc: true },
  //     BY_WOMEN: { where: 'category == "women"' },
  //     BY_MEN: { where: 'category == "women"' },
  //     BY_CHILDREN: { where: 'category == "children"' },
  //     ALL: {},
  //   };
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
  async create(item) {
    return isArray(item)
      ? this.collection.pouch.bulkDocs(item)
      : this.collection.insert(item);
  }
  async upsert(item) {
    return this.collection.atomicUpsert(item);
  }
  async find(
    { match, limit = DEFAULT_LIMIT_AMOUNT, skip = 0, count = false } = {}
  ) {
    const foundItems = this.collection
      .find(match)
      .limit(limit)
      .skip(skip)
      .exec();
    if (!count) return foundItems;
    const totalAmount = new Promise(async (resolve) => {
      const allItems = await this.collection.find(match).exec();
      resolve(allItems.length);
    });
    return Promise.all([foundItems, totalAmount]);
  }
  //   async update(id, item) {}
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
  //   const { items } = await this.query({ select, where, order, limit, offset });
  //   //   yield items;
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
  // Create collection first
  const collection = db.items
    ? db.items
    : await db.collection({
      name: 'items',
      schema,
    });
  // Return an item instance
  return new Item(db, collection);
}
