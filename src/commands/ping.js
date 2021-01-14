module.exports = {
    name: `ping`,
    description: `A simple ping command that show response time`,
    execute(message) {
        message.reply(`Latency is ${Date.now() - message.createdTimestamp}ms.`)
    }
}
