import { Client, Interaction, MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export const definition = new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('template')
            .setDescription('Warn User by Template')
            .addUserOption((option) =>
                option.setName('user').setDescription('User').setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName('template')
                    .setDescription('Warning Template')
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('config')
            .setDescription('Warn User by Template')
            .addUserOption((option) =>
                option.setName('user').setDescription('User').setRequired(true)
            )
            .addStringOption((o) =>
                o
                    .setName('description')
                    .setDescription('Warning Description')
                    .setRequired(true)
            )
            .addIntegerOption((o) =>
                o.setName('points').setDescription('Warning Points')
            )
    )

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
export function run(client, interaction) {
    let user = interaction.options.getUser('user')
    let points = 0
    let description

    switch (interaction.options.getSubcommand()) {
        case 'template':
            ;({ points, description } = get_template(
                interaction.options.getString('template')
            ))
            break

        case 'config':
            points = interaction.options.getInteger('points')
            description = interaction.options.getString('description')
            break
    }

    let embed = new MessageEmbed()
        .setColor(0xf0ad4e)
        .setDescription(
            ':warning: **Warning 00001**\n\n' +
                `:bust_in_silhouette: ${user}\n` +
                `:shield: ${interaction.user}\n` +
                `:level_slider: **${points}** points`
        )

    let dm_embed = new MessageEmbed()
        .setColor(0xf0ad4e)
        .setDescription(
            ':warning: **You have been warned!**\n\n' + description
        )
        .setFooter({
            text: `This warning weights ${points} points.`,
        })

    interaction.reply({ embeds: [embed, dm_embed] })
}

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
function get_template(s) {
    switch (s) {
        case 'nsfw':
            return {
                points: 10,
                description: 'NSFW Content',
            }

        case 'spam-major':
            return {
                points: 5,
                description: 'Spam',
            }

        case 'spam':
            return {
                points: 1,
                description: 'Spam (Minor)',
            }
    }
}
