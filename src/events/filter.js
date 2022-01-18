import { Message } from 'discord.js'
import Filter from 'bad-words'

const filter = new Filter()

/**
 * @param {Message} message
 */
async function run(message) {
    if (message.channel.type !== 'text') return

    if (filter.isProfane(message.content)) {
        message.delete()
    }
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
