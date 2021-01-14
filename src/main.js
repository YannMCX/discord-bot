const fs = require(`fs`)
const path = require(`path`)
const Discord = require(`discord.js`)
const { Player } = require(`discord-music-player`)
const config = require(`./config`)
const logger = require(`./lib/logger`)

const client = new Discord.Client()
const player = new Player(client, {
    ...config.music
})
const cooldowns = new Discord.Collection()
client.commands = new Discord.Collection()
client.player = player

const commandFiles = fs.readdirSync(path.join(__dirname, `./commands`))

client.once(`ready`, () => {
    logger.info(`[EVENT] Discord.JS Bot is ready !`)

    for (const file of commandFiles) {
        const command = require(path.join(__dirname, `./commands`, file))
        client.commands.set(command.name, command)
        logger.info(`Loading command ${file}`)
    }
})

client.on(`message`, message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command =
        client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) {
        return
    }
    if (command.guildOnly && message.channel.type === `dm`) {
        return message.reply(`Impossible d'éxecuter la commande en DM`)
    }
    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author)
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply(`Vous n'avez pas la permission de faire ceci !`)
        }
    }
    if (command.args && !args.length) {
        let reply = `Vous n'avez spécifié aucun argument, ${message.author}!`
        if (command.usage) {
            reply += `\nUtilisation de la commande: \`${config.prefix}${command.name} ${command.usage}\``
        }
        return message.channel.send(reply)
    }

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
            return message.reply(
                `Merci d'attendre ${timeLeft.toFixed(1)} secondes avant de réutiliser la commande \`${command.name}\`.`
            )
        }
    }

    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

    try {
        command.execute(message, args, client)
    } catch (error) {
        console.error(error)
        message.reply(`there was an error trying to execute that command!`)
    }
})

client.login(config.token)
