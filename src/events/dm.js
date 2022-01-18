import { Message } from 'discord.js'

/**
 * @param {Message} message
 */
async function run(message) {
    if (message.channel.type !== 'DM') return

    console.log('DM', message.content)
}

/**
 * @export
 */
export default [
    {
        name: 'messageCreate',
        run,
    },
]
