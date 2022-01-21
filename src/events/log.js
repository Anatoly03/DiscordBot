import { Message, MessageEmbed, GuildMember } from 'discord.js'
import io from '../io.js'

/**
 * @param {GuildMember} member
 */
async function member_join(member) {
    if (new_message.channel.type === 'DM') return
    if (new_message.author.bot) return

    console.log('member join')
}

/**
 * @param {GuildMember} member
 */
async function member_leave(member) {
    if (new_message.channel.type === 'DM') return
    if (new_message.author.bot) return

    console.log('member leave')
}

/**
 * @param {Message} old_message
 * @param {Message} new_message
 */
async function message_edit(old_message, new_message) {
    if (new_message.channel.type === 'DM') return
    if (new_message.author.bot) return

    console.log('message edit')
}

/**
 * @param {Message} message
 */
async function message_delete(message) {
    if (new_message.channel.type === 'DM') return
    if (new_message.author.bot) return

    console.log('message delete')
}

/**
 * @param {{content? : string, embeds?: MessageEmbed[]}} content Message Content
 */
async function push(content) {
    if (message.channel.type !== 'text') return
    if (message.author.bot) return

    const log_channel = await reaction.message.guild.channels.fetch(
        '826362812284141579'
    )

    return await log_channel?.send(content)
}

/**
 * @export
 */
export default [
    {
        name: 'messageUpdate',
        run: message_edit,
    },
    {
        name: 'messageDelete',
        run: message_delete,
    },
    {
        name: 'guildMemberAdd',
        run: member_join,
    },
    {
        name: 'guildMemberRemove',
        run: member_leave,
    },
]
