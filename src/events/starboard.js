import { MessageReaction, User } from 'discord.js'
//import io from '../io.js'
//import { sb_ch } from '../config.json'

/**
 * @param {MessageReaction} reaction
 * @returns {boolean}
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
    if (!await partial_fetch(reaction)) return

    console.log(reaction.message.content)
}

/**
 * @param {MessageReaction} reaction
 * @param {User} user
 */
async function reaction_remove(reaction, user) {
    if (!await partial_fetch(reaction)) return

    console.log(reaction.message.content)
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
