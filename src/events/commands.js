import { Interaction, Message } from 'discord.js'

/**
 * @param {Interaction} interaction
 */
async function interaction_command(interaction) {
    if (!interaction.isCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) return interaction.reply(':no_entry: Command not found.')
    await command.run(interaction.client, interaction)
}

/**
 * @param {Message} message
 */
async function message_command(message) {
    if (message.channel.type === 'DM') return
    if (!message.content.match(/[\.\-!].+/)) return
    let input = message.content.substring(1).match(/".*"|`.+`|[a-zA-Z0-9\-\.]+/g)
    
    console.log(input)
}

/**
 * @export
 */
export default [
    {
        name: 'interactionCreate',
        run: interaction_command,
    },
    {
        name: 'messageCreate',
        run: message_command,
    },
]
