module.exports = {
	name: 'kick',
	description: 'Kick people who are not abiding by the rules!',
    guildOnly: true,
    args: true,
    usage: '<user>',
    permissions: 'KICK_MEMBERS',
	execute(message, args) {
                
        const taggedUser = message.mentions.users.first()

        message.channel.send(`You kicked: ${taggedUser.username}`)
        taggedUser.kick()
	},
};