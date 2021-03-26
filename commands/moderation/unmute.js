module.exports = {
	name: 'Unmute',
	description: 'Unmute people who should be given a second chance',
    guildOnly: true,
    args: true,
    usage: '<user>',
    permissions: 'UNMUTE_MEMBERS',
	execute(message, args) {
                
        const taggedUser = message.mentions.users.first()

        message.channel.send(`You ban: ${taggedUser.username}`)
        message.guild.members.unmute(taggedUser)
	},
};