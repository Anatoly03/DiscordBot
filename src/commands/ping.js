import { Client, Interaction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export const definition = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!')

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
export function run(client, interaction) {
    interaction.reply('Ping command.')
}
