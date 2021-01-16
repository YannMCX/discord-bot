module.exports = {
    name: `stop`,
    description: `Stop the music`,
    execute(message, args, client) {
        client.player.stop(message.guild.id)
        message.reply(`Musique arrêtée`)
    }
}
