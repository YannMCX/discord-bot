module.exports = {
    name: `skip`,
    description: `Skip current song`,
    async execute(message, args, client) {
        const song = await client.player.skip(message.guild.id)
        message.reply(`"${song.name}" passée`)
    }
}
