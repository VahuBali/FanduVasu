module.exports = {
    name: 'message',
    execute(message) {
        console.log(`${message.author.tag} in ${message.guild.name} at the #${message.channel.name} channel, sent: ${message.content}`)
    }
}