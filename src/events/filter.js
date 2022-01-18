import { Message } from 'discord.js'
import Filter from 'bad-words'

const filter = new Filter()

export const name = 'messageCreate'

/**
 * @param {Message} message
 */
export async function run(message) {
    if (message.channel.type !== 'text') return

    if (filter.isProfane(message.content)) {
        message.delete()
    }
}
