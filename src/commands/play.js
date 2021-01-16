module.exports = {
    name: `play`,
    description: `Play music from Youtube using URL or song name`,
    async execute(message, args, client) {
        const isPlaying = client.player.isPlaying(message.guild.id)
        const queue = client.player.getQueue(message.guild.id)
        const songQuery = args.join(` `)

        if (isPlaying) {
            const _song = await client.player.addToQueue(message.guild.id, songQuery)
            await client.player.setVolume(message.guild.id, 30)
            const { song } = _song

            console.log(queue)
            message.reply(`Musique ${song.name} ajoutée à la file d'attente. Position: #${queue.songs.length}`)
        } else {
            const _song = await client.player.play(message.member.voice.channel, songQuery)
            await client.player.setVolume(message.guild.id, 30)
            const { song } = _song
            message.reply(`Started playing ${song.name} !`)
        }
    }
}
