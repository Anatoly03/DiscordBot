import { Client, Interaction, MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

const definition = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Command List for the bot.')

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
function run(client, interaction) {
    let response = new MessageEmbed().setColor(0x0275d8)

    response
        .setTitle('Help')
        .setDescription(':small_blue_diamond: `/warn (user)` Warn User')

    interaction.reply({ embeds: [response] })
}

/**
 * @export
 */
export default [
    {
        definition,
        run,
    },
]
