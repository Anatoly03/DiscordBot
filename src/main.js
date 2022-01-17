import { Client, Interaction } from 'discord.js'

/**
 * @param {Client} client
 */
export async function on_init(client) {
    console.log(`Connected as ${client.user.tag}!`)
}

/**
 * @param {Interaction} interaction
 */
export async function on_command(interaction) {
    if (!interaction.isCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    console.log(command)
    if (!command) return interaction.reply(':no_entry: Command not found.')
    await command.run(interaction.client, interaction)
}
