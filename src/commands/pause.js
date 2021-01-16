module.exports = {
    name: `pause`,
    description: `Pause current music`,
    async execute(message, args, client) {
        const song = await client.player.pause(message.guild.id)
        message.reply(`${song.name} mis sur pause`)
    }
}
