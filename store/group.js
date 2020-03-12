'use strict';

const Datastore = require('nedb-promise');
const { getRandomName } = require('../utils/names');

const Group = new Datastore({
	autoload: true,
	filename: 'data/Group.db',
});

Group.ensureIndex({
	fieldName: 'group_id',
	unique: true,
});

const addGroup = group =>
	Group.update({
		group_id: group.group_id
	}, {
		$set: group
	}, {
		upsert: true
	});

const updateGroup = data =>
	Group.update({
		group_id: data.group_id
	}, {
		$set: data
	});

const removeGroup = group => Group.remove(group);

const getGroup = group => Group.findOne(group);

const getUniqueFakeName = board_id => new Promise(resolve => {
	const fake_name = getRandomName();
	getGroup({ boardUID: board_id, fake_name }).then(group => {
		if (group === null) {
			resolve(fake_name);
		} else {
			resolve(getUniqueFakeName(board_id));
		}
	});
});

module.exports = {
	addGroup,
	getGroup,
	removeGroup,
	updateGroup,
	getUniqueFakeName,
};
