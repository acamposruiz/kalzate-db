'use strict';

/**
 * Module dependences.
 */
import {generateRandomCode} from '../../../../helpers/users';
import crypto from 'crypto';

/**
 * Update an user
 *
 * @param {String} userID user id
 * @param {Object} data data to update
 * @param {Function} cb callback to return
 * @return {undefined}
 * @todo sanitize data before going to db and after returning
*/
export function parse(data) {

  const salt = new Buffer(crypto.randomBytes(16)).toString('base64');
  const password = crypto.pbkdf2Sync(data.password, salt, 10000, 64).toString('base64');

  return {

    _id: generateRandomCode(),
    firstname: data.firstname,
    lastname: data.firstname,
    username: data.firstname,
    password: password,
    email: data.email,
    role: data.role || 'employee',
    provider: 'local',
    salt: salt,
    language: data.language || 'spa',
    actived: data.actived || true

  }

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
export function deserialize(data) {

  return {

    'id': data._id,
    'firstname': data.firstname,
    'lastname':  data.lastname,
    'username': data.username,
    'email': data.email,
    'role': data.role,
    'phone': data.phone,
    'actived': data.actived || true,
    'language': data.language || 'es',

  }

};
