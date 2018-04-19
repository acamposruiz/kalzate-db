import { create, plugin } from 'rxdb';
import MemoryAdapter from 'pouchdb-adapter-memory';
import Stock from 'models/stock';

plugin(MemoryAdapter);

export const getStockInstance = async (
  dbOptions = {
    name: 'kalzatedb',
    adapter: 'memory',
    multiInstance: true,
  }
) => Stock(await create(dbOptions));

export const isErrorInstanceOf = async (fn, ErrorType) => {
  let error = {};
  try {
    await fn();
  } catch (e) {
    error = e;
  }
  const { title, code } = new ErrorType();
  return { result: error.title === title && error.code === code, error };
};
