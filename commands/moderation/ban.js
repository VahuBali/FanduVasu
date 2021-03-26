module.exports = {
	name: 'ban',
	description: 'Ban people who are not abiding by the rules!',
    guildOnly: true,
    args: true,
    usage: '<user>',
    permissions: 'BAN_MEMBERS',
	execute(message, args) {
                
        const taggedUser = message.mentions.users.first()

        message.channel.send(`You banned: ${taggedUser.username}`)
        message.guild.members.ban(taggedUser)
	},
};