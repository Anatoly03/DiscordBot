import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Client, Collection } from 'discord.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @param {Client} client
 */
export default async function (client) {
    client.commands = new Collection()

    const commands = fs
        .readdirSync(__dirname + '/commands')
        .filter((file) => file.endsWith('.js') && file != 'init.js')

    for (const file of commands) {
        const command = await import(`${__dirname}/commands/${file}`)
        let command_name = file.substring(0, file.length - 3)
        client.commands.set(command_name, command)
    }
}

/**
 * @param {Client} client
 */
export async function get_slash_commands(client) {
    const definitions = fs
        .readdirSync(__dirname + '/commands')
        .filter((file) => file.endsWith('.js'))
        .map(async (file) => {
            let command = await import(`${__dirname}/commands/${file}`)
            return command.definition
        })
    
    let commands = await Promise.all(definitions)

    return commands.map(c => c.toJSON())
}
