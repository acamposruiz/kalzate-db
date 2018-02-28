/* eslint-disable */
'use strict';

import { create, plugin } from 'rxdb';
import MemoryAdapter from 'pouchdb-adapter-memory';
import { expect } from 'chai';
import Items from 'models/items';

plugin(MemoryAdapter);

describe('create items', function() {
  const dbOptions = {
    name: 'kalzatedb',
    adapter: 'memory',
    multiInstance: true
  };

  it('should throw error if no rx database is given', async function() {
    try {
      const items = await Items();
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should throw error if no rx collection is given', async function() {
    try {
      const db = await create(dbOptions);
      const items = await Items(db);
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should throw error if no reference is given when creating an item', async function() {
    const db = await create(dbOptions);
    const items = await Items(db);
    try {
      const item = await items.create({ price: 2 });
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should throw error if reference is not an string', async function() {
    const db = await create(dbOptions);
    const items = await Items(db);
    try {
      // Number
      const item = await items.create({ reference: 2 });
    } catch (error) {
      expect(error).to.be.an('error');
    }
    try {
      // undefined
      const item = await items.create({ reference: void 0 });
    } catch (error) {
      expect(error).to.be.an('error');
    }
    try {
      // Boolean
      const item = await items.create({ reference: true });
    } catch (error) {
      expect(error).to.be.an('error');
    }
    try {
      // function
      const item = await items.create({ reference: () => null });
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should throw error if no price is given when creating an item', async function() {
    const db = await create(dbOptions);
    const items = await Items(db);
    try {
      const item = await items.create({ reference: 'a' });
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should create an item using a reference and a price', async function() {
    const db = await create(dbOptions);
    const items = await Items(db);
    const item = await items.create({ reference: 'a', price: 2.04 });
    expect(item).to.have.property('reference', 'a');
    expect(item).to.have.property('price', 2.04);
  });
});
