
import { isRxCollection, isRxDatabase, RxQuery } from 'rxdb';
import { isArray, size, fromPairs, map } from 'lodash';
import schema from 'models/settings/schema';

class Settings {

  defaults = [{ key: 'country', value: 'spain' }];

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
    const settingsFound = await this.collection.find().exec();
    return size(settingsFound) ? settingsFound : fromPairs(map(this.defaults, ({ key, value }) => [key, value]));
  }
}

export default async function (db) {
  // Create or Retrieve collection first
  const collection = db.collections.settings ? db.collections.settings :
    await db.collection({
      name: 'settings',
      schema,
    });
  // Return an Stock instance
  return new Settings(db, collection);
}


