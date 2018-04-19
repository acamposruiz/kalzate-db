// /* eslint-disable */
// 'use strict';

// import { create, plugin } from 'rxdb';
// import MemoryAdapter from 'pouchdb-adapter-memory';
// import { expect } from 'chai';
// import Items from 'models/items';
// import fixtures from 'models/items/tests/fixtures.json';

// plugin(MemoryAdapter);

// describe('import/export items', function() {
//   const dbOptions = {
//     name: 'kalzatedb',
//     adapter: 'memory',
//     multiInstance: true
//   };

//   it('should create an item using a reference and a price', async function() {
//     // const db = await create(dbOptions);
//     // const items = await Items(db);
//     // const count = await items.import(fixtures);
//     // expect(count).to.have.length(fixtures.length);
//   });
//   it('should allow bulk inserts', async function() {
//     const db = await create(dbOptions);
//     const items = await Items(db);
//     const item = await items.create(fixtures);
//     expect(item).to.have.length(fixtures.length);
//   });
// });
