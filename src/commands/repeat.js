module.exports = {
    name: `repeat`,
    description: `Toggle repeat mode`,
    async execute(message, args, client) {
        if (args[0] === `enable` || args[0] === `true`) {
            client.player.setRepeatMode(message.guild.id, true)
            const song = await client.player.nowPlaying(message.guild.id)
            message.reply(`${song.name} mis en répétition`)
        } else if (args[0] === `disable` || args[0] === `false`) {
            client.player.setRepeatMode(message.guild.id, false)
            const song = await client.player.nowPlaying(message.guild.id)
            message.reply(`${song.name} mis en non-répétition`)
        }
    }
}
