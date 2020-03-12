'use strict';

const crypto = require('crypto');
const { getRandomName } = require('./names');

const findNewBoardUID = db => new Promise(resolve => {
	const uid = crypto.randomBytes(20).toString('hex');
	db.findOne({
		uid
	}, (_err, doc) => {
		if (doc === null) {
			resolve(uid);
		} else {
			findNewBoardUID(db).then(resolve);
		}
	});
});

const findUniqueName = (db, board_id) => new Promise(resolve => {
	const name = getRandomName();
	db.findOne({
		boardUID: board_id,
		fake_name: name
	}, (_err, doc) => {
		if (doc === null) {
			resolve(name);
		} else {
			findUniqueName.then(resolve);
		}
	});
});

const getGroupById = (db, group_id) => new Promise(resolve => {
	db.findOne({
		group_id
	}, (_err, doc) => {
		resolve(doc);
	});
});

const getBoardById = (db, uid) => new Promise(resolve => {
	db.findOne({
		uid
	}, (_err, doc) => {
		resolve(doc.settings);
	});
});

module.exports = {
	findNewBoardUID,
	findUniqueName,
	getGroupById: getGroupById,
	getBoardById: getBoardById,
};
