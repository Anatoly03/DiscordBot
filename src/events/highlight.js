import { Message, User } from 'discord.js'
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
 * @param {string} str
 * @returns {string[][]} Patterns [id, pattern, match] that were triggered.
 */
export async function check(user, str) {
    return []
}

/**
 * @param {Message} message
 * @returns {boolean} is profane
 */
export async function check_message(message) {
    if (message.channel.type === 'dm') return

    let client = message.client

    users:
    for (let [id, highlights] of Object.entries(patterns)) {
        for (let highlight of highlights) {
            if (message.content.includes(highlight)) {
                client.users.fetch(id).then((user) => {
                    user.send(`${message.author.tag} said: ${message.content}`)
                })
                continue users
            }
        }
    }
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
