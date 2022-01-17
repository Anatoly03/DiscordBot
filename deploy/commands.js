import { config } from 'dotenv'
import { Client, Intents } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'

config()

const commands = [
    new SlashCommandBuilder()
        .setName('set')
        .setDescription('La la')
        .addStringOption((option) =>
            option
                .setName('category')
                .setDescription('La la')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('value')
                .setDescription('La la')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
    new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),
].map((command) => command.toJSON())

const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
})

client.on('ready', async () => {
    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)
    const guilds = await client.guilds.fetch()

    guilds.forEach(
        async (guild) =>
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, guild.id),
                {
                    body: commands,
                }
            )
    )

    console.log('\x1b[32mSuccessfully registered application commands.\x1b[0m')
    client.destroy()
})

client.login(process.env.DISCORD_TOKEN)
