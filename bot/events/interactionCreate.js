const { Events } = require('discord.js');
const { filterSaga } = require('../commands/episodes/list');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		}
		else if (interaction.isButton()) {
			if (interaction.customId === 'previous') {
				console.log('Previous');
			}
			else if (interaction.customId === 'next') {
				console.log('Next');
			}
		}
		else if (interaction.isStringSelectMenu()) {
			const sagaChoosed = interaction.values.toString();
			filterSaga(sagaChoosed);
		}
	},
};
