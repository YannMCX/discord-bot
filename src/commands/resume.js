module.exports = {
    name: `resume`,
    description: `Resume current paused music`,
    async execute(message, args, client) {
        const song = await client.player.resume(message.guild.id)
        message.reply(`${song.name} mis sur lecture`)
    }
}
