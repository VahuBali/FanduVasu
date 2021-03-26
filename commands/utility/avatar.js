module.exports = {
	name: 'avatar',
    aliases: ['icon', 'pfp'],
	description: 'Gets the avatar of the person you mention or yourself',
    usage: '<user>',

	execute(message) {
		if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar is: <${message.author.displayAvatarURL({ dynamic : true })}>`)
        }
        
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar is: <${user.displayAvatarURL({ dynamic : true })}>`
        })

        message.channel.send(avatarList)
	},
};