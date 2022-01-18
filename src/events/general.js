import { Client, Guild, MessageEmbed } from 'discord.js'
import io from '../io.js'

/**
 * @param {Client} client
 */
async function run(client) {
    let guilds = ((await io.get(`c=${client.user.id}`)) || '').split('\n')

    // Remove guilds that are no longer joined
    /*for (let guild of guilds) {
        if (guild == '') continue
        console.log('NO LONGER VALID GUILD', guild)
    }*/

    // Add guilds that are new joined
    let current_guilds = client.guilds.cache
    for (let [_, guild] of current_guilds) {
        register_new_guild(guild)
    }

    //await io.set(`c=${client.user.id}`, current_guilds.map((guild) => guild.id).join('\n'))
}

/**
 * @param {Guild} guild
 */
async function register_new_guild(guild) {
    /*let response = new MessageEmbed().setColor(0x02d875)

    response
        .setTitle('Hello, World!')
        .setDescription('Thank you for inviting me!')

    let channel = guild.channels.cache.find(
        (channel) => channel.name == 'general'
    )

    channel.send({ embeds: [response] })*/
}

/**
 * @export
 */
export default [
    {
        name: 'ready',
        once: true,
        run,
    },
]
