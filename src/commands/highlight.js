import { Client, Interaction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import * as highlight from '../events/highlight.js'

export const definition = new SlashCommandBuilder()
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
export async function run(client, interaction) {
    switch (interaction.options.getSubcommand()) {
        case 'add':
            {
                let p = interaction.options.getString('pat')
                await highlight.add(interaction.user, p)
                interaction.reply('Added')
            }
            break

        case 'del':
            {
                let p = interaction.options.getString('pat')
                let response = await highlight.del(interaction.user, p)
                interaction.reply(response ? 'Done' : 'Not found')
            }
            break

        case 'list':
            interaction.reply('TO DO')
            break
    }
}
