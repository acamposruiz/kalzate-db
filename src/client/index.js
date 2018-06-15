import * as RxDB from 'rxdb';
import Stock from 'models/stock';
import Tickets from 'models/tickets';
import Settings from 'models/settings';
import PouchdbAdapterIdb from 'pouchdb-adapter-idb';
// import PouchdbAdapterWebSQL from 'pouchdb-adapter-websql';
// import PouchdbAdapterLocalstorage from 'pouchdb-adapter-localstorage';

RxDB.plugin(PouchdbAdapterIdb);
// RxDB.plugin(PouchdbAdapterWebSQL);
// RxDB.plugin(PouchdbAdapterLocalstorage);

const defaultOptions = {
  name: 'kalzatedb',
  adapter: 'idb',
  multiInstance: true,
};

export default async function (dbOptions) {
  const options = { ...defaultOptions, ...dbOptions };
  const db = await RxDB.create(options);
  const stock = await Stock(db);
  const tickets = await Tickets(db);
  const settings = await Settings(db);
  return { stock, tickets, settings };
}
