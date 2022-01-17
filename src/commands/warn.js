import { Client, Interaction, MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export const definition = new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addUserOption((o) =>
        o.setName('user').setDescription('User to warn').setRequired(true)
    )
    .addIntegerOption((o) =>
        o.setName('points').setDescription('Points to take away')
    )

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
export function run(client, interaction) {
    let user = interaction.options.getUser('user')
    let points = interaction.options.getInteger('points') || 0

    let embed = new MessageEmbed()
        .setColor(0xf0ad4e)
        .setDescription(
            ':warning: **Warning 00001**\n\n' +
                `:bust_in_silhouette: ${user}\n` +
                `:shield: ${interaction.user}\n` +
                `:level_slider: **${points}** points`
        )

    interaction.reply({ embeds: [embed] })
}
