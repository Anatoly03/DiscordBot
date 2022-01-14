import { config } from 'dotenv'
import { Client, Intents } from 'discord.js'
import * as main from './main.js'

config()

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
})

client.on('ready', main.on_init)

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return
    main.on_command(interaction)
})

client.login(process.env.DISCORD_TOKEN)
