import { config } from 'dotenv'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Client, Intents } from 'discord.js'

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
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
})

async function main() {
    config()
    await init_events()
    await client.login(process.env.DISCORD_TOKEN)
}

async function init_events() {
    const eventFiles = fs
        .readdirSync(__dirname + '/events')
        .filter((file) => file.endsWith('.js'))

    for (const file of eventFiles) {
        const events = await import(__dirname + `/events/${file}`)
        for (const event of events.default) {
            if (event.once)
                client.once(event.name, (...args) => event.run(...args))
            else client.on(event.name, (...args) => event.run(...args))
        }
    }
}

main()
