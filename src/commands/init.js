import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Client, Collection } from 'discord.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @param {Client} client
 */
export default async function (client) {
    client.commands = new Collection()

    const commands = fs
        .readdirSync(__dirname)
        .filter((file) => file.endsWith('.js') && file != 'init.js')

    for (const file of commands) {
        const command = await import(`${__dirname}/${file}`)
        let command_name = file.substring(0, file.length - 3)
        client.commands.set(command_name, command)
    }
}
