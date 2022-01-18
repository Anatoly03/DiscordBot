import { Message, MessageEmbed, MessageReaction, User } from 'discord.js'
//import io from '../io.js'
//import config from '../config.json'
//const starboard_channel = JSON.parse(config).sb_ch

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
 * @param {MessageReaction} reaction
 * @param {User} user
 */
async function reaction_add(reaction, user) {
    if (!(await partial_fetch(reaction))) return

    const embed = starboard_embed(reaction.message)

    reaction.message.reply({ embeds : [embed] })

    //console.log(reaction.message.content)
}

/**
 * @param {MessageReaction} reaction
 * @param {User} user
 */
async function reaction_remove(reaction, user) {
    if (!(await partial_fetch(reaction))) return

    console.log(reaction.message.content)
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
 * @export
 */
export default [
    {
        name: 'messageReactionAdd',
        run: reaction_add,
    },
    {
        name: 'messageReactionRemove',
        run: async (r, u) => reaction_remove,
    },
]
