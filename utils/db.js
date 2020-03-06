'use strict';

const crypto = require('crypto');
const { getRandomName } = require('./names');

const findNewBoardUID = db => new Promise(resolve => {
    const uid = crypto.randomBytes(20).toString('hex');
    db.findOne({
        uid: uid
    }, (err, doc) => {
        if (doc !== null) {
            // hash exists, try again...
            createNewBoard(db).then(resolve);
        } else {
            resolve(uid);
        }
    });
});

const findUniqueName = (db, board_id) => new Promise(resolve => {
    const name = getRandomName();
    db.findOne({
        boardUID: board_id,
        fake_name: name
    }, (err, doc) => {
        if (doc === null) {
            resolve(name);
        } else {
            findUniqueName.then(resolve);
        }
    });
});

const getMeFakeName = (db, group_id) => new Promise(resolve => {
    db.findOne({
        group_id: group_id
    }, (err, doc) => {
        resolve(doc);
    })
});

module.exports = {
    findNewBoardUID,
    findUniqueName,
    getMeFakeName,
}