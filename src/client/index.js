import * as RxDB from 'rxdb';
import Items from 'models/items';
import Tickets from 'models/tickets';
import Browse from 'models/browse';
import Settings from 'models/settings';

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
