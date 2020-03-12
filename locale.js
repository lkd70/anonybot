EN = {

    // commands/create.js
    create_outside_soupergroup: `/create should only ever be used in a new empty supergroup...
Ensure you've made this bot admin in the group with the 'delete messages' permission.`,

    create_syntax_help: `Invalid syntax used for /create command...
correct syntax:
    \`/create [Board_Name] [Description]\`
Example:
    \`/create AnonymousBoard101 A simple board with anonimity\``,

    create_success_message: (board, fake_name, uid) =>
`Done!Your new board '*${board}*'
is now ready

Your unique name is: '${fake_name}'
Share your board with others using this unique ID: \`${uid}\`
They can start chatting anonymously by using the /join command`,

    create_group_in_use: `This group is already in use for another board. Please create a new group for a new board...`,


    // commands/help.js
    help: `Welcome to Anonybot!
Type /create to make a new board!
or if you have the hash for an existing group, simply '/join <HASH>'

Don't forget to make me an admin so I can manage this group!`,


    // commands/info.js
    info_non_supergroup: `this is a supergroup only command. 
Ensure that you make this bot admin`,

    info_current_group: (boardUID, fake_name) =>
        `*INFO*
hash: \`${boardUID}\`
your name: \`${fake_name}\``,

    info_unknown_group: `This group isn't known to the bot yet... /create or /join a board to register this group.`,


    // commands/join.js
    join_outside_supergroup: `/join should only ever be used in a new empty supergroup...`,

    join_syntax:
`Invalid syntax used for /join command...
correct syntax:
    \`/join [board-hash]\`
Example:
    \`/join 0934ec1ec2bc2b0483d37c17ccfd793a4d0a249c\``,

    join_unknown_group: `Unknown hash... Perhaps /create your own?`,

    join_success: (board, fake_name) => `Welcome to '*${board}*'

Your unique name is: '${fake_name}'`,

    join_in_use: `This group is already in use for another board.
Please create a new group for a new board...`,
    



    // MIDDLEWARE

    // middleware/ensure_admin.js
    must_be_admin: `Bot must be admin in order to be used in this group.`,

    // middleware/anti_add.js
    kicked: members => `🚫 *Kicked:* ${members.map(m => m.username).join(', ')}.
Reminder: This group should only contain yourself and me. This is for your anonymity`,


    // midduleware/added.js
    added_too_many_members: `Only yourself and I can be in this group...
Please remove all others and re-add me, Cya!`,

    added_back: `I'm back!
It seems this group is already setup with this bot, awesome!
Type /info for more`,



    
};

module.exports = { EN };