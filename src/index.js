import { config } from 'dotenv'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Client, Intents } from 'discord.js'
import { redis } from './io.js'
import init_commands from './commands.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Discord's Gateway Model:
// https://discord.com/developers/docs/topics/gateway#list-of-intents
const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
})

// Before code execution
;(async () => {
    config()
    await redis.connect()
    await init_commands(client)
})()

// Events
;(async () => {
    const eventFiles = fs
        .readdirSync(__dirname + '/events')
        .filter((file) => file.endsWith('.js'))

    for (const file of eventFiles) {
        const events = await import(__dirname + `/events/${file}`)
        for (const event of events.default) {
            client.on(event.name, (...args) => event.run(...args))
        }
    }
})()

client.login(process.env.DISCORD_TOKEN)
