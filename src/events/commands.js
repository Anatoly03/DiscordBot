import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, Interaction, Message, Collection } from 'discord.js'

/**
 * @param {Client} client
 */
async function initialize_slash_commands(client) {
    client.commands = new Collection()

    const __dirname = dirname(fileURLToPath(import.meta.url))
    const __parentdir = __dirname.match(/(.*)\/\w+$/)[1]

    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)
    const guilds = await client.guilds.fetch()
    const command_files = await Promise.all(
        fs
            .readdirSync(__parentdir + '/commands')
            .filter((file) => file.endsWith('.js'))
            .map(async (file) => {
                return await import(`${__parentdir}/commands/${file}`)
            })
    )

    const body = command_files.map((c) => c.definition.toJSON())
    for (let [id, guild] of guilds) {
        await rest.put(
            Routes.applicationGuildCommands(client.user.id, guild.id),
            { body }
        )
    }

    for (const file of command_files) {
        client.commands.set(file.definition.name, file)
    }
}

/**
 * @param {Interaction} interaction
 */
async function interaction_command(interaction) {
    if (!interaction.isCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) return interaction.reply(':no_entry: Command not found.')
    await command.run(interaction.client, interaction)
}

/**
 * @param {Message} message
 */
async function message_command(message) {
    if (message.channel.type === 'DM') return
    const input = command_arguments(message)
    if (input == null) return

    console.log(input)
}

/**
 * @param {Message} message
 */
export function command_arguments(message) {
    if (message.content.match(/^[\.\-!].+$/) == null) return

    return message.content
        .substring(1)
        .match(/".*"|`.+`|[a-zA-Z0-9\-\.]+/g)
}

/**
 * @export
 */
export default [
    {
        name: 'interactionCreate',
        run: interaction_command,
    },
    {
        name: 'messageCreate',
        run: message_command,
    },
    {
        name: 'ready',
        once: true,
        run: initialize_slash_commands,
    },
]

/*import { config } from 'dotenv'
import { Client, Intents } from 'discord.js'

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







/*import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Client, Collection } from 'discord.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @param {Client} client
 * /
export default async function (client) {
    client.commands = new Collection()

    const commands = fs
        .readdirSync(__dirname + '/commands')
        .filter((file) => file.endsWith('.js') && file != 'init.js')

    for (const file of commands) {
        const command = await import(`${__dirname}/commands/${file}`)
        client.commands.set(command.definition.name, command)
    }
}*/
