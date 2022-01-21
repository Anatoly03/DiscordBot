import { Message, MessageEmbed } from 'discord.js'

let link = {}

/**
 * @param {Message} message
 * @description If a user direct messages the bot,
 * the message arrives here.
 */
async function message_incoming(message) {
    if (message.channel.type !== 'DM') return
    if (message.author.bot) return

    const mod_channel = await message.client.guilds.cache
        .get('826066564368302080')
        .channels.fetch('826099046803308594')

    if (!mod_channel) return

    const thread = await mod_channel.threads.create({
        name: message.author.tag,
        autoArchiveDuration: 60,
        reason: 'Modmail',
    })

    let response = new MessageEmbed()
        .setColor(0x5bc0de)
        .setAuthor({
            name: message.author.tag,
            iconURL: message.author.avatarURL(),
        })
        .setDescription(message.content.substring(0, 1024))

    thread.send({
        embeds: [response],
    })
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
