'use strict';

const { getGroup } = require('../../store/group');

module.exports = ctx => {
	if (ctx.update.message.chat.type === 'supergroup') {
		const group_id = ctx.update.message.chat.id;
		getGroup({ group_id }).then(group => {
			if (group === null) {
				ctx.replyWithMarkdown(ctx.strings.info_unknown_group);
			} else {
				ctx.replyWithMarkdown(ctx.strings.info_current_group(
					group.boardUID,
					group.owner
				));
			}
		});
	} else {
		ctx.replyWithMarkdown(ctx.strings.info_non_supergroup);
	}
};
