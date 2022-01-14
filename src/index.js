import { config } from 'dotenv'
import { Client, Intents } from 'discord.js'

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
        Intents.FLAGS.GUILD_MEMBERS
    ],
})

client.on("ready", async () => {
    console.log("Connected!");
});

client.login(process.env.DISCORD_TOKEN);
