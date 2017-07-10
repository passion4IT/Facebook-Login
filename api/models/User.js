/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        uid: {
            type: 'string'
        },
        first_name: {
            type: 'string'
        },
        last_name: {
            type: 'string'
        },
        contact: {
            type: 'string'
        },
        facebookLink: {
            type: 'string',
        },
        birthday: {
            type: 'date'
        },
        profilePic: {
            type: 'string'
        },
        coverPic: {
            type: 'string'
        },
        about: {
            type: 'string'
        }
    }
};

