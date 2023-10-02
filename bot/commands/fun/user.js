const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Another test command - can be used later !'),
	async execute(interaction) {
		await interaction.reply(`
        Command run by ${interaction.user.username}, joined the server on ${interaction.member.joinedAt}.
        `);
	},
};