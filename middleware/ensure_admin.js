'use strict';
const hasPerms = perms => {
if (perms.can_change_info &&
    perms.can_delete_messages &&
    perms.can_restrict_members &&
    perms.can_pin_messages) return true;
return false
};

const handler = async (ctx, next) => {
    const isAdmin = hasPerms(await ctx.telegram.getChatMember(
        ctx.update.message.chat.id,
        ctx.botInfo.id));

    if (!isAdmin) {
        ctx.reply(ctx.strings.must_be_admin);
    } else {
        next();
    }
};

module.exports = handler;
