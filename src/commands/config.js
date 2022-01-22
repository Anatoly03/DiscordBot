import { Client, Interaction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

const definition = new SlashCommandBuilder()
    .setName('set')
    .setDescription('La la')
    .addStringOption((o) =>
        o.setName('category').setDescription('La la').setRequired(true)
    )
    .addStringOption((o) =>
        o.setName('value').setDescription('La la').setRequired(true)
    )

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
function run(client, interaction) {
    interaction.reply('Set command.')
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
