import { Client, Interaction, MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import * as highlight from '../events/highlight.js'

const definition = new SlashCommandBuilder()
    .setName('hl')
    .setDescription('Add or remove highlight.')
    .addSubcommand((command) =>
        command
            .setName('add')
            .setDescription('Add highlight.')
            .addStringOption((option) =>
                option
                    .setName('pat')
                    .setDescription('Pattern of highlight.')
                    .setRequired(true)
            )
    )
    .addSubcommand((command) =>
        command
            .setName('del')
            .setDescription('Remove highlight.')
            .addStringOption((option) =>
                option
                    .setName('pat')
                    .setDescription('Pattern of highlight.')
                    .setRequired(true)
            )
    )
    .addSubcommand((command) =>
        command.setName('list').setDescription('List all patterns.')
    )

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
async function run(client, interaction) {
    let embed = new MessageEmbed().setColor(0x0275d8)

    switch (interaction.options.getSubcommand()) {
        case 'add':
            {
                let p = interaction.options.getString('pat')
                await highlight.add(interaction.user, p)

                embed
                    .setTitle('Highlight Add')
                    .setDescription(`Added highlight: \`${p}\``)

                interaction.reply({ embeds: [embed] })
            }
            break

        case 'del':
            {
                let p = interaction.options.getString('pat')
                let response = await highlight.del(interaction.user, p)

                if (response)
                    embed
                        .setTitle('Highlight Remove')
                        .setDescription(`Removed highlight: \`${p}\``)
                else
                    embed
                        .setTitle('Highlight Remove')
                        .setDescription(`Failed to remove highlight.`)

                interaction.reply({ embeds: [embed] })
            }
            break

        case 'list':
            {
                let response = highlight.list(interaction.user)

                response.unshift('')

                embed.setTitle('Highlights').setDescription(
                    response.reduce((a, b) => {
                        if (a.length > 0) a += ', '
                        a += `\`${b}\``
                        return a
                    })
                )

                interaction.reply({ embeds: [embed] })
            }
            break
    }
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
