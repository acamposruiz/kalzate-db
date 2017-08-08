'use strict';

/**
 * Module dependencies.
 */
import PouchDB from 'pouchdb';
import path from 'path';

export default new PouchDB(path.resolve(__dirname, '..', '..', '..', 'leveldb', 'users'));
