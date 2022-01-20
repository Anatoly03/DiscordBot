import io from '../io.js'

let patterns

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
 * @param {string} str
 * @returns {boolean} is profane
 */
export async function load(str) {
    patterns = await io.get('filter/patterns')
    if (!patterns) patterns = []

    return true
}