'use strict';

/**
 * Module dependences.
 */

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

  if(!data) return;
  
  return {

    'id': data.id,
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
