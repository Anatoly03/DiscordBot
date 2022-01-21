import { Message, MessageEmbed, User } from 'discord.js'
import io from '../io.js'

let patterns = {}
await load()

/**
 * @param {User} user
 * @param {string} regexp
 */
export async function add(user, regexp) {
    if (!patterns[user.id]) patterns[user.id] = []
    patterns[user.id].push(regexp)
    await io.set(`highlight`, JSON.stringify(patterns))
}

/**
 * @param {User} user
 * @param {string} regexp
 * @returns {boolean} success
 */
export async function del(user, regexp) {
    if (!patterns[user.id]) return false
    if (patterns[user.id]?.includes(regexp)) {
        patterns[user.id] = patterns[user.id].filter((r) => r != regexp)
        await io.set(`highlight`, JSON.stringify(patterns))
        return true
    }
    return false
}

/**
 * @param {User} user
 * @returns {string[]} Patterns [id, pattern, match] that were triggered.
 */
export function list(user, str) {
    return patterns[user.id].map((a) => a)
}

/**
 * @param {Message} message
 * @returns {boolean} is profane
 */
export async function check_message(message) {
    if (message.channel.type === 'DM') return
    let client = message.client

    Object.keys(patterns).forEach(async (id) => {
        for (let highlight of patterns[id]) {
            if (message.content.match(new RegExp(highlight, 'gi'))) {
                let user = await client.users.fetch(id)
                let link_to = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`

                let embed = new MessageEmbed()
                    .setColor(0x0275d8)
                    .setTitle('Highlight')
                    .setDescription(
                        `[Message](${link_to}) triggered \`${highlight}\``
                    )

                user.send({ embeds: [embed] })

                return
            }
        }
    })
}

/**
 * @param {string} str
 * @returns {boolean} is profane
 */
export async function load(str) {
    let input = await io.get('highlight')
    if (input) patterns = JSON.parse(input)
    return true
}

/**
 * @export
 */
export default [
    {
        name: 'messageCreate',
        run: check_message,
    },
]
