import { MessageReaction, User } from 'discord.js'

/**
 * @param {MessageReaction} reaction
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
    console.log(reaction.message.content)
}

/**
 * @param {MessageReaction} reaction
 * @param {User} user
 */
async function reaction_remove(reaction, user) {
    console.log(reaction.message.content)
}

/**
 * @export
 */
export default [
    {
        name: 'messageReactionAdd',
        run: async (r, u) => {
            if (await partial_fetch(r)) reaction_add(r, u)
        },
    },
    {
        name: 'messageReactionRemove',
        run: async (r, u) => {
            if (await partial_fetch(r)) reaction_remove(r, u)
        },
    },
]
