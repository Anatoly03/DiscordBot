import { Interaction } from 'discord.js'

/**
 * @param {Interaction} interaction
 */
async function run(interaction) {
    if (!interaction.isCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) return interaction.reply(':no_entry: Command not found.')
    await command.run(interaction.client, interaction)
}

/**
 * @export
 */
 export default [
    {
        name: 'interactionCreate',
        run,
    },
]
