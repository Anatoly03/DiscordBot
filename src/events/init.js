import { Client } from 'discord.js'

/**
 * @param {Client} client
 */
function run(client) {
    console.log(`Connected as ${client.user.tag}!`)
}

/**
 * @export
 */
export default [
    {
        name: 'ready',
        run,
    },
]
