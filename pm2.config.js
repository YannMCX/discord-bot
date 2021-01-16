module.exports = {
    apps: [
        {
            name: `discord-bot`,
            script: `src/main.js`,
            watch: [`src`],
            ignore_watch: [`logs/*`, `.git`, `node_modules`],
            watch_options: {
                usePolling: true
            },
            env: {
                NODE_ENV: `development`
            }
        }
    ]
}
