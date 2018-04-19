// /* eslint-disable */
// 'use strict';

// import { create, plugin } from 'rxdb';
// import MemoryAdapter from 'pouchdb-adapter-memory';
// import { expect } from 'chai';
// import Items from 'models/items';
// import { DEFAULT_LIMIT_AMOUNT } from 'models/items/config';
// import fixtures from 'models/items/tests/fixtures.json';

// plugin(MemoryAdapter);

// describe('find items', function() {
//   const dbOptions = {
//     name: 'kalzatedb',
//     adapter: 'memory',
//     multiInstance: true
//   };

//   let db, items;

//   beforeAll(async () => {
//     db = await create(dbOptions);
//     items = await Items(db);
//     await items.create(fixtures);
//   });

//   it('should return DEFAULT_LIMIT_AMOUNT items by default', async function() {
//     const itemsFound = await items.find();
//     expect(itemsFound).to.have.length(DEFAULT_LIMIT_AMOUNT);
//   });
//   it('should return the amount of items specified', async function() {
//     const itemsFound = await items.find({ limit: DEFAULT_LIMIT_AMOUNT + 1 });
//     expect(itemsFound).to.have.length(DEFAULT_LIMIT_AMOUNT + 1);
//   });
//   it('should skip the amount of items specified', async function() {
//     const itemsNotSkipped = await items.find({ limit: 1 });
//     const itemsSkipped = await items.find({ limit: 1, skip: 1 });
//     expect(itemsNotSkipped).to.have.length(1);
//     expect(itemsSkipped).to.have.length(1);
//     expect(itemsSkipped).to.not.be.equal(itemsNotSkipped);
//   });
//   it('should return nothing if all items are skipped', async function() {
//     const itemsSkipped = await items.find({
//       limit: 1,
//       skip: DEFAULT_LIMIT_AMOUNT * 100
//     });
//     expect(itemsSkipped).to.have.length(0);
//     expect(itemsSkipped).to.be.empty;
//   });
//   it('should return all items if amount is higher than all existing items', async function() {
//     const itemsFound = await items.find({ limit: DEFAULT_LIMIT_AMOUNT * 100 });
//     expect(itemsFound).to.have.length(fixtures.length);
//     expect(itemsFound).to.not.be.empty;
//   });
//   it('should return the total if count is enabled', async function() {
//     const [itemsFound, count] = await items.find({ limit: 1, count: true });
//     expect(itemsFound).to.have.length(1);
//     expect(itemsFound).to.not.be.empty;
//     expect(count).to.be.equal(fixtures.length);
//   });
//   it('should return no items if search does not match anything', async function() {
//     const [itemsFound, count] = await items.find({
//       match: { price: 2 },
//       count: true
//     });
//     expect(itemsFound).to.have.length(0);
//     expect(itemsFound).to.be.empty;
//     expect(count).to.be.equal(0);
//   });
// });
