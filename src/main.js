import { Client, Interaction } from "discord.js"

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
    const { commandName } = interaction

    switch (commandName) {
        case 'ping':
            await interaction.reply('Pong!')
            break
        case 'server':
            await interaction.reply('Server info.')
            break
        case 'user':
            await interaction.reply('User info.')
            break
    }
}
