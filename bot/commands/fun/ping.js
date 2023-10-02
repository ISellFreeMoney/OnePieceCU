const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Try it, basicly a test purpose command'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};