/**
 * Use mongo as model
 */

// class Ticket {
//   constructor(db) {
//     this._db = db;
//   }
//   async create(item) {}
//   async update(id, item) {}
//   async remove(id) {}
//   async query() {}
//   async import() {}
//   async export() {}
// }

// export default async function (db) {
//   // Create collection
//   return new Ticket(db);
// }
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
import schema from 'models/tickets/schema';

class Tickets {

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
    const ticketsFound = await this.collection.find().exec();
    return size(ticketsFound) ? ticketsFound : this.defaults;
  }
}

export default async function (db) {
  // Create or Retrieve collection first
  const collection = db.collections.tickets ? db.collections.tickets :
    await db.collection({
      name: 'tickets',
      schema,
    });
  // Return an Tickets instance
  return new Tickets(db, collection);
}

