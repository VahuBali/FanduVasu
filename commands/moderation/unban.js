module.exports = {
	name: 'unban',
	description: 'Unban people who had their timeout',
    guildOnly: true,
    args: true,
    usage: '<user>',
    permissions: 'UNBAN_MEMBERS',
	execute(message, args) {
                
        const id = args[0]

        message.channel.send(`You want to unban: ${id.username}`)
        message.guild.members.unban(id)
	},
};