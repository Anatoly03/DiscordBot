import { Message, MessageEmbed } from 'discord.js'

let links = {}

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

    links[message.author.id] = thread.id
}

/**
 * @param {Message} message
 * @description If a moderator sends a message
 * using the bot, it will be sent to the user.
 */
async function message_outgoing(message) {
    if (message.author?.bot) return
    if (message.channel.type !== 'GUILD_PUBLIC_THREAD') return
    let user_id = Object.keys(links).find(
        (key) => links[key] === message.channel.id
    )
    if (!user_id) return

    const user = await message.client.users.fetch(user_id)

    let response = new MessageEmbed()
        .setColor(0x5bc0de)
        /*.setAuthor({
            name: message.author.tag,
            iconURL: message.author.avatarURL(),
        })*/
        .setDescription(message.content.substring(0, 1024))

    user.send({
        embeds: [response],
    })
}

/**
 * @export
 */
export default [
    {
        name: 'messageCreate',
        run: message_incoming,
    },
    {
        name: 'messageCreate',
        run: message_outgoing,
    },
]
