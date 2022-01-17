import { Client } from 'discord.js'

export const name = 'ready'

/**
 * @param {Client} client
 */
export function run(client) {
    console.log(`Connected as ${client.user.tag}!`)
}
