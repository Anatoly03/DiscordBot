import { Client, Interaction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export const definition = new SlashCommandBuilder()
    .setName('filter')
    .setDescription('Add or remove words from the filter.')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('add')
            .setDescription('Add a new regexp to the filter.')
            .addStringOption((option) =>
                option
                    .setName('pattern')
                    .setDescription('The user')
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('del')
            .setDescription('Delete a regexp pattern.')
            .addStringOption((option) =>
                option
                    .setName('id')
                    .setDescription('The user')
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('list')
            .setDescription('List all profanity patterns.')
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('check')
            .setDescription('Proof a string against the filter.')
            .addStringOption((option) =>
                option
                    .setName('content')
                    .setDescription('The user')
                    .setRequired(true)
            )
    )

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
export async function run(client, interaction) {
    switch (interaction.options.getSubcommand()) {
        case 'add':
            add_filter(interaction)
            break

        case 'del':
            del_filter(interaction)
            break

        case 'list':
            list_filter(interaction)
            break

        case 'check':
            check_filter(interaction)
            break
    }
}

/**
 * @param {Interaction} interaction
 */
async function add_filter(interaction) {
    const pat = interaction.options.getString('pattern')
    const id = filter.add(pat)

    interaction.reply('Added.')
}

/**
 * @param {Interaction} interaction
 */
async function del_filter(interaction) {
    interaction.reply('Deleted.')
}

/**
 * @param {Interaction} interaction
 */
 async function list_filter(interaction) {
    interaction.reply('Listed.')
}

/**
 * @param {Interaction} interaction
 */
async function check_filter(interaction) {
    interaction.reply('Checked.')
}
