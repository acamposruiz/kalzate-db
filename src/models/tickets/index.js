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
import { isRxCollection, isRxDatabase } from 'rxdb';
import { merge } from 'lodash';
import schema from 'models/tickets/schema';
import uuidv1 from 'uuid/v1';
import { DEFAULT_LIMIT_AMOUNT } from 'models/tickets/config';
import {
  TicketNoSavedError,
} from 'errors/tickets';

class Tickets {
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
   * @method save
   * Saves a new ticket document
   * @param {array|object} ticket/s item/s
   * @param {string} state
   */
  async save(ticket, state) {
    try {
      return await this.createOne(ticket, state);
    } catch (e) {
      throw new TicketNoSavedError(e, ticket);
    }
  }

  /**
   * @method get
   * This fetches the ticket items given a filter
   * @param {object} {match, limit, skip, count, sort}
   */
  async get({
    match,
    limit = this.defaults.limit,
    skip = this.defaults.skip,
    count = true,
    sort = { created_at: 'desc' },
  } = {}) {
    const foundTickets = this.collection
      .find(match)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .exec();
    if (!count) return foundTickets;
    const totalAmount = new Promise(async (resolve) => {
      const allTickets = await this.collection.find(match).exec();
      resolve(allTickets.length);
    });
    const [items, total] = await Promise.all([foundTickets, totalAmount]);
    return { items, total, limit, skip };
  }

  /** ***************************************************** */
  /*                  PRIVATE METHODS                      */
  /** ***************************************************** */

  /**
   * @method createOne
   * Cretes a new ticket document in db
   * @param {array|object} ticket/s item/s
   * @param {string} state
   */
  async createOne(ticket, state) {
    try {
      return this.upsert(
        merge({ items: ticket.items }, ticket.payment, {
          state,
          id: uuidv1(),
          created_at: new Date().getTime(),
        })
      );
    } catch (e) {
      throw new Error('createOne function');
    }
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

