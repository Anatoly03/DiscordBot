import { Message } from 'discord.js'

export const name = 'messageCreate'

/**
 * @param {Message} message
 */
export async function run(message) {
    if (message.channel.type !== 'DM') return
    
    console.log('DM', message.content)
}
