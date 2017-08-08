/**
 * Public API
*/
import RxDB from 'client/rxdb';

const ClientFactory = async (...options) => RxDB(...options);

// for CommonJS compatibility
module.exports = ClientFactory;
