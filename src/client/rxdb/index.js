import * as RxDB from 'rxdb';
import Items from 'models/items/rxdb';
import Tickets from 'models/tickets/rxdb';
import Browse from 'models/browse/rxdb';
import Settings from 'models/settings/rxdb';

const defaultOptions = {
  name: 'kalzatedb',
  adapter: 'websql',
  multiInstance: true,
};

export default async function (dbOptions) {
  const options = { ...defaultOptions, ...dbOptions };
  const db = await RxDB.create(options);
  const items = await Items(db);
  const tickets = await Tickets(db);
  const browse = await Browse(db);
  const settings = await Settings(db);
  return { items, tickets, browse, settings };
}
