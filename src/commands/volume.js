module.exports = {
    name: `volume`,
    description: `Change volume when playing music`,
    execute(message, args, client) {
        let volume = args[0]
        if (isNaN(volume)) {
            return message.reply(`La valeur "${volume}" doit être un entier, compris entre 0 et 100`)
        }
        volume = parseInt(volume)
        if (volume > 100) {
            return message.reply(`Le volume doit être entre 0 et 100`)
        }

        client.player.setVolume(message.guild.id, volume)
        message.reply(`Volume réglé sur ${volume}%`)
    }
}
