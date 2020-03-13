'use strict';

const Datastore = require('nedb-promise');
const crypto = require('crypto');

const Board = new Datastore({
	autoload: true,
	filename: 'data/Board.db',
});

Board.ensureIndex({
	fieldName: 'uid',
	unique: true,
});

const addBoard = board =>
	Board.update({
		uid: board.uid
	}, {
		$set: board
	}, {
		upsert: true
	});

const updateBoard = data =>
	Board.update({
		uid: data.uid
	}, {
		$set: data
	});

const removeBoard = board => Board.remove(board);

const getBoard = board => Board.findOne(board);

const getNewBoardId = () => new Promise(resolve => {
	const uid = crypto.randomBytes(20).toString('hex');
	Board.findOne({ uid }).then(res => resolve(res === null ? uid : getNewBoardId));
});

module.exports = {
	addBoard,
	getBoard,
	removeBoard,
	updateBoard,
	getNewBoardId,
};
