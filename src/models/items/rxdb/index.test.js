/* eslint-disable */
'use strict';

import 'babel-polyfill';
import { create, plugin } from 'rxdb';
import MemoryAdapter from 'pouchdb-adapter-memory';
import { expect } from 'chai';
import Items from 'models/items/rxdb';

plugin(MemoryAdapter);

describe('create items', function() {
  const dbOptions = {
    name: 'kalzatedb',
    adapter: 'memory',
    multiInstance: true
  };

  it('should create an item using a reference and a price', async function() {
    const db = await create(dbOptions);
    const items = await Items(db);
    const item = await items.create({ reference: 'a', price: 2 });
    // console.log(item);
    expect(1 + 1).to.be.equal(2);
  });

  // it('should allow me to get a random name from the list', function() {
  // 	expect(lib.random()).to.satisfy( isIncludedIn(data) )
  // 	//expect( isIncludedIn(data)(lib.random()) ).to.be.true
  // })
});
