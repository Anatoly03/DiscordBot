import { Message } from 'discord.js'

/**
 * @param {Message} message
 * @description If a user direct messages the bot,
 * the message arrives here.
 */
async function message_incoming(message) {
    if (message.channel.type !== 'DM') return

    console.log('DM', message.content)
}

/**
 * @param {Message} message
 * @description If a moderator sends a message
 * using the bot, it will be sent to the user.
 */
async function message_outgoing(message) {
    // Modmail Thread -> User
}

/**
 * @export
 */
export default [
    {
        name: 'messageCreate',
        run: message_incoming,
    },
]
