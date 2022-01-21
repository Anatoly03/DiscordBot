import { User } from 'discord.js'
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
        patterns[user.id] = patterns[user.id].filter(r => r != regexp)
        await io.set(`highlight`, JSON.stringify(patterns))
        return true
    }
    return false
}

/**
 * @param {string} str
 * @returns {string[][]} Patterns [id, pattern, match] that were triggered.
 */
export async function check(str) {
    return []
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
        run: () => {},
    },
]