module.exports = {
	name: 'Mute',
	description: 'Mute people who are being annoying',
    guildOnly: true,
    args: true,
    usage: '<user>',
    permissions: 'MUTE_MEMBERS',
	execute(message, args) {
                
        const taggedUser = message.mentions.users.first()

        message.channel.send(`You muted: ${taggedUser.username}`)
        message.guild.members.mute(taggedUser)
	},
};