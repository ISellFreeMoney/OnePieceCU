const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');


const menu = new StringSelectMenuBuilder()
	.setCustomId('menu')
	.setPlaceholder('Choose the Saga')
	.addOptions(
		new StringSelectMenuOptionBuilder()
			.setLabel('East Blue')
			.setValue('east_blue'),
		new StringSelectMenuOptionBuilder()
			.setLabel('Alabasta')
			.setValue('alabasta'),
		new StringSelectMenuOptionBuilder()
			.setLabel('Skypiea')
			.setValue('skypiea'),
		new StringSelectMenuOptionBuilder()
			.setLabel('Water Seven')
			.setValue('water_seven'),
		new StringSelectMenuOptionBuilder()
			.setLabel('Thriller Bark')
			.setValue('thriller_bark'),
		new StringSelectMenuOptionBuilder()
			.setLabel('Guerre Au Sommet')
			.setValue('marineford'),
		new StringSelectMenuOptionBuilder()
			.setLabel('Ile des Hommes-Poissons')
			.setValue('fishman'),
		new StringSelectMenuOptionBuilder()
			.setLabel('Dressrosa')
			.setValue('dressrosa'),
		new StringSelectMenuOptionBuilder()
			.setLabel('Whole Cake')
			.setValue('whole_cake'),
		new StringSelectMenuOptionBuilder()
			.setLabel('Pays de Wa')
			.setValue('wano'),
	);

const next = new ButtonBuilder()
	.setCustomId('next')
	.setLabel('Next page')
	.setStyle(ButtonStyle.Primary);
const previous = new ButtonBuilder()
	.setCustomId('previous')
	.setLabel('Previous page')
	.setStyle(ButtonStyle.Secondary);

const menu_row = new ActionRowBuilder()
	.addComponents(menu);

const row = new ActionRowBuilder()
	.addComponents(previous, next);

module.exports = {
	menu_row, row,
};