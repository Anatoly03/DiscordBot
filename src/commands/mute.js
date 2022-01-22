import { Client, Interaction, MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

const mute = new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a user')
    .addUserOption((option) =>
        option.setName('user').setDescription('User').setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName('time')
            .setDescription('Time Duration: e.g. 30m, 6h, 2d, 1w')
    )
    .addBooleanOption((option) =>
        option
            .setName('harsh')
            .setDescription('Harsh Warning (timer starts only after appealing)')
    )

const unmute = new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Mute a user')
    .addUserOption((option) =>
        option.setName('user').setDescription('User').setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName('time')
            .setDescription('Time Duration: e.g. 30m, 6h, 2d, 1w')
            .setRequired(true)
    )

const appeal = new SlashCommandBuilder()
    .setName('appeal')
    .setDescription('Mute a user')
    .addUserOption((option) =>
        option.setName('user').setDescription('User').setRequired(true)
    )

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
function run(client, interaction) {
    interaction.reply({
        content: 'Not implemented yet.',
        ephemeral: true,
    })
}

/**
 * @export
 */
export default [
    {
        definition: mute,
        run,
    },
    {
        definition: unmute,
        run,
    },
    {
        definition: appeal,
        run,
    },
]
