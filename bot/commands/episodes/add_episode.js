const { SlashCommandBuilder } = require('discord.js');
const { episodes } = require('../../database/base');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_episode')
		.setDescription('Adding an episode to the data base')
		.addStringOption(name =>
			name.setName('name')
				.setDescription('Name of the episode you want to add')
				.setRequired(true))
		.addStringOption(duration =>
			duration.setName('duration')
				.setDescription('Duration of the episode (in minutes)')
				.setRequired(true))
		.addStringOption(saga =>
			saga.setName('saga')
				.setDescription('Which saga is this episode from')
				.addChoices(
					{ name: 'East Blue', value: 'east_blue' },
					{ name: 'Alabasta', value: 'alabasta' },
					{ name: 'Skypiea', value: 'skypiea' },
					{ name: 'Water Seven', value: 'water_seven' },
					{ name: 'Thriller Bark', value: 'thriller_bark' },
					{ name: 'Guerre Au Sommet', value: 'marineford' },
					{ name: 'Ile des Hommes-Poissons', value:'fishman' },
					{ name: 'Dressrosa', value: 'dressrosa' },
					{ name: 'Whole Cake', value: 'whole_cake' },
					{ name: 'Wano', value: 'Wano' },
				)
				.setRequired(true)),
	async execute(interaction) {
		console.log(episodes);
		const data = { title: interaction.options.getString('name'), duration: interaction.options.getString('duration'), saga: interaction.options.getString('saga'), note: 0 };
		const result = await episodes.insertOne(data);
		await interaction.reply(`
        Vous avez ajouté l'épisode "${interaction.options.getString('name')}" \nil dure ${interaction.options.getString('duration')} mins \net fait partie de la saga: ${interaction.options.getString('saga')}
        \n\nL'id de l'episode est: ${result.insertedId} (testing purposes)`);
	},
};