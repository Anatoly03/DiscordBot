import { config } from 'dotenv'
import { Client, Intents } from 'discord.js'
import * as main from './main.js'
import { redis } from './io.js'
import init_commands from './commands/_init.js'

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
    ],
});

// Before code execution
(async () => {
    config()
    await redis.connect()
    await init_commands(client)
})()

client.on('ready', main.on_init)
client.on('interactionCreate', main.on_command)

client.login(process.env.DISCORD_TOKEN)
