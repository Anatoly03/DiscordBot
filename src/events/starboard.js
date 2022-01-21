import { Message, MessageEmbed, MessageReaction, User } from 'discord.js'
import io from '../io.js'

// REMOVE INITIALIZATION: Initialised, if starboard is activated.
let star_requirement_push = 1
let star_requirement_pull = 0
let starboard = {}
await load()

/**
 * @param {MessageReaction} reaction
 * @param {User} user
 */
async function reaction_add(reaction, user) {
    if (!starboard) return false
    if (!(await partial_fetch(reaction))) return

    const reaction_count = message_reactions(reaction.message).first().count
    if (star_requirement_push > reaction_count) return

    const starboard_channel = await reaction.message.guild.channels.fetch(
        '826111403739054090'
    )

    if (!starboard_channel) return

    if (starboard[reaction.message.id]) {
        // EDIT MESSAGE ON STARBOARD

        const message = await starboard_channel.messages.fetch(
            starboard[reaction.message.id]
        )
        if (!message) return

        message.edit({
            content: message_reactions_string(reaction.message),
            embeds: [starboard_embed(reaction.message)],
        })
    } else {
        // PUSH MESSAGE TO STARBOARD

        const message = await starboard_channel.send({
            content: message_reactions_string(reaction.message),
            embeds: [starboard_embed(reaction.message)],
        })

        starboard[reaction.message.id] = message.id
        await io.set(`starboard/messages`, JSON.stringify(starboard))
    }
}

/**
 * @param {MessageReaction} reaction
 * @param {User} user
 */
async function reaction_remove(reaction, user) {
    if (!starboard) return false
    if (!(await partial_fetch(reaction))) return

    const reaction_count = message_reactions(reaction.message).first()?.count || 0
    if (star_requirement_pull < reaction_count) return
    if (!starboard[reaction.message.id]) return

    // PULL MESSAGE FROM STARBOARD

    const starboard_channel = await reaction.message.guild.channels.fetch(
        '826111403739054090'
    )

    const message = await starboard_channel?.messages.fetch(
        starboard[reaction.message.id]
    )

    message?.delete()

    delete starboard[reaction.message.id]
    await io.set(`starboard/messages`, JSON.stringify(starboard))
}

/**
 * @param {Message} message
 * @returns {MessageEmbed}
 * @description Generate an embed for the starboard message.
 */
function starboard_embed(message) {
    const embed = new MessageEmbed()
        .setColor(0xffd700)
        .setTimestamp(message.editedTimestamp || message.createdTimestamp)
        .setAuthor({
            name: message.author.username,
            iconURL: message.author.avatarURL(),
        })

    if (message.attachments.size > 0)
        embed.setImage(message.attachments.first().url)
    if (message.content.length > 0) embed.setDescription(message.content)

    const link_to_message = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`

    embed.addField(
        'Source',
        `[Message](${link_to_message}) in <#${message.channel.id}>`
    )

    return embed
}

/**
 * @param {Message} message
 * @returns {Collection<string, MessageReaction>}
 */
function message_reactions(message) {
    return message.reactions.cache.sort((a, b) => b.count - a.count)
}

/**
 * @param {Message} message
 * @returns {string}
 * @description Generate a reaction string for the starboard message.
 */
function message_reactions_string(message) {
    let content = ''
    message_reactions(message).forEach((reaction) => {
        if (!reaction.emoji) return
        if (content.length > 0) content += '   '
        content += `${reaction.emoji}   **${reaction.count}**`
    })
    return content
}

/**
 * @param {MessageReaction} reaction
 * @returns {boolean} Whether the reaction is valid
 */
async function partial_fetch(reaction) {
    // https://discordjs.guide/popular-topics/reactions.html#listening-for-reactions-on-old-messages
    if (reaction.partial)
        try {
            await reaction.fetch()
        } catch (error) {
            return false
        }
    return true
}

/**
 * @io
 */
async function load() {
    let input = await io.get('starboard/messages')
    if (input) starboard = JSON.parse(input)
}

/**
 * @export
 */
export default [
    {
        name: 'messageReactionAdd',
        run: reaction_add,
    },
    {
        name: 'messageReactionRemove',
        run: reaction_remove,
    },
]
