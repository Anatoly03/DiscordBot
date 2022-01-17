import { Client, Interaction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export const definition = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!')

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
export function run(client, interaction) {
    interaction.reply('Set command.')
}
