'use strict';

/**
 * Module dependences.
 */
import userDB from './model';
import * as normalize from './normalize';

/**
 * Create an user
 *
 * @param {Object} userData The user data
 * @param {Function} cb The callback to return
 * @return {undefined}
 * @todo sanitize data before going to db and after returning
 */
export function create(userData, cb){

  userDB.put(normalize.parse(userData))
  .then(user => userDB.get(user.id))
  .then(user => cb(null, normalize.deserialize(user)))
  .catch(error => cb(error));

 };

/**
 * Update an user
 *
 * @param {String} userID user id
 * @param {Object} data data to update
 * @param {Function} cb callback to return
 * @return {undefined}
 * @todo sanitize data before going to db and after returning
 */
export function update(userID, data, cb) {

  userDB.get(userID)
  .then(user => {

    Object.assign(user, data);

    return userDB.put(user);

  })
  .then(user => userDB.get(user.id))
  .then(user => cb(null, normalize.deserialize(user)))
  .catch(error => cb(error));

};

/**
 * Authenticates an user
 *
 * @param {String} identifier An user identifier( can be an email, username, phone, ...)
 * @param {String} password The user password
 * @param {Function} cb callback to return
 * @return {undefined}
 * @todo sanitize data before going to db and after returning
 * @todo reuse userData instance in findOne callback from read function
 */
export function authenticate(identifier, password, cb) {

  const $or = [{'email': identifier}, {'username': identifier}];

  userDB.findOne({$or}, function(error, userData) {

    if(error) return cb(error, false);

    if(!userData) return cb(new Error({msg:'Unknown user', code: 1}), false);

    if(!userData.authenticate(password)) return cb(new Error({msg:'Invalid password', code: 2}), false);

    return cb(null, userData);

  });

};

/**
 * Serializes an user
 *
 * @param {Object} user The user to serialize
 * @param {Function} cb callback to return
 * @return {undefined}
 * @todo sanitize data before going to db and after returning
 */
export function serialize(userData, cb) {

  cb(null, userData.id);

};

/**
 * Deserializes an user
 *
 * @param {String} userID the user id
 * @param {Function} cb callback to return
 * @return {undefined}
 * @todo sanitize data before going to db and after returning
 */
export function deserialize(userID, cb) {

  userDB.get(userID)
  .then(user => cb(null, normalize.deserialize(user)))
  .catch(error => cb(error));

};
