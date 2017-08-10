/**
 * Public API
*/
import RxDB from 'client';

const ClientFactory = async (...options) => RxDB(...options);

// for CommonJS compatibility
module.exports = ClientFactory;
