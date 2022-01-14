export async function on_init() {
    console.log('Connected!')
}

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
