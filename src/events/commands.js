import { Interaction } from 'discord.js'

export const name = 'interactionCreate'

/**
 * @param {Interaction} interaction
 */
export async function run(interaction) {
    if (!interaction.isCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) return interaction.reply(':no_entry: Command not found.')
    await command.run(interaction.client, interaction)
}
