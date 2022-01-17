import { config } from 'dotenv'
import { Client, Intents } from 'discord.js'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { get_slash_commands } from '../src/commands.js'

config()

const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
})

client.on('ready', async () => {
    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)
    const guilds = await client.guilds.fetch()

    guilds.forEach(
        async (guild) => {
            let commands = await get_slash_commands(client, guild)
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, guild.id),
                {
                    body: commands,
                }
            )
        }
    )

    console.log('\x1b[32mSuccessfully registered application commands.\x1b[0m')
    client.destroy()
})

client.login(process.env.DISCORD_TOKEN)
