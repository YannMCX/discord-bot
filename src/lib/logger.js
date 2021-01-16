const path = require(`path`)
const moment = require(`moment`)
const winston = require(`winston`)

const logPath = path.resolve(__dirname, `../../logs`)
const env = process.env.NODE_ENV || `development`

const levels = {
    critical: 0,
    error: 1,
    warning: 2,
    info: 3
}

const logger = winston.createLogger({
    levels,
    format: winston.format.combine(
        winston.format.label(),
        winston.format.timestamp(),
        winston.format.printf(log => `${moment().format(`HH:mm:ss`)} [${log.level.toUpperCase()}] - [${env}] - ${log.message}`)
    ),
    transports: [
        new winston.transports.File({
            filename: `${logPath}/${moment().format(`MM-DD-YYYY`)}/app.log`
        }),
        new winston.transports.Console()
    ]
})

module.exports = logger
