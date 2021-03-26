const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const { prefix } = require('./config.json');
client.commands = new Discord.Collection()
const commandFolders = fs.readdirSync("./commands")
client.cooldowns = new Discord.Collection()


for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
    } else {
        client.on(event.name, (...args) => event.execute(...args, client))
    }
}

client.once('ready', () => {
    console.log('Ready!')
    client.user.setActivity(`"fv help" in ${client.guilds.cache.size} servers`, { type: 'PLAYING' })
})


client.on('message', message => {

    if(message.content.includes("824701820194390057")){ return message.reply("Hey man wassup, if you want to interact with me more just type `fv help` in this channel!") }

    if (message.content === 'thank you') {
        message.react('🤗')
    }

    if (message.content === 'Vasu Bansal') {
        message.react('😃')
    }

    if (message.content === 'smart') {
        message.react('💯')
    }

    if (message.content === 'money') {
        message.react('💰')
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();


    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) return

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    
    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author)
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('You can not do this!')
        }
    }



    if (command.args && !args.length) {
        let reply = `You didn't provide enough details smarty-pants, ${message.author}!`
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
        }

        return message.channel.send(reply)
    }

    const { cooldowns } = client

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000
            return message.reply(`Please Wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
        }
    }

    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)


    try {
        command.execute(message, args)
    } catch (error) {
        console.error(error)
        message.reply("Their was an error trying to execute that command!")
    }
})




client.login(process.env.BOT_TOKEN)