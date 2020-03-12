'use strict';

module.exports = () => ctx => {
	if (ctx.update.message.chat.type === 'supergroup') {
		const group_id = ctx.update.message.chat.id;
		ctx.db.groups.findOne({
			group_id
		}, (_err, doc) => {
			if (doc === null) {
				ctx.replyWithMarkdown(ctx.strings.info_unknown_group);
			} else {
				ctx.db.groups.findOne({
					group_id
				}, (__err, docx) => {
					ctx.replyWithMarkdown(ctx.strings.info_current_group(
						docx.boardUID,
						docx.owner
					));
				});
			}
		});
	} else {
		ctx.replyWithMarkdown(ctx.strings.info_non_supergroup);
	}
};
