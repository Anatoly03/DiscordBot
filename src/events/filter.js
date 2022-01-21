import { Message } from 'discord.js'
import io from '../io.js'

let patterns = {}
await load()

/**
 * @param {string} regexp
 * @returns {string} id
 */
export async function add(regexp) {
    if (!patterns) await load()

    return 'ABCDEF'
}

/**
 * @param {string} id
 * @returns {boolean} success
 */
export async function del(id) {
    if (!patterns) await load()

    return true
}

/**
 * @param {string} str
 * @returns {string[][]} Patterns [id, pattern] that exist.
 */
 export async function list(str) {
    if (!patterns) await load()

    return []
}

/**
 * @param {string} str
 * @returns {string[][]} Patterns [id, pattern, match] that were triggered.
 */
export async function check(str) {
    if (!patterns) await load()

    return []
}

/**
 * @param {string} str
 * @returns {boolean} is profane
 */
export async function is_profane(str) {
    if (!patterns) await load()

    return false
}

/**
 * @io
 */
export async function load() {
    let input = await io.get('filter')
    if (input) patterns = JSON.parse(input)
}

/**
 * @param {Message} message
 */
async function run(message) {
    if (message.channel.type !== 'text') return
    if (message.author.bot) return

    // If message profane, delete.
}

/**
 * @export
 */
export default [
    {
        name: 'messageCreate',
        run,
    },
]
