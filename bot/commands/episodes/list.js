const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { episodes, chapters, users } = require('../../database/base');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('List of episodes')
		.addStringOption(saga =>
			saga.setName('saga')
				.setDescription('Which saga you want the list')
				.addChoices(
					{ name: 'All episodes', value: 'all' },
					{ name: 'East Blue', value: 'east_blue' },
					{ name: 'Alabasta', value: 'alabasta' },
					{ name: 'Skypiea', value: 'skypiea' },
					{ name: 'Water Seven', value: 'water_seven' },
					{ name: 'Thriller Bark', value: 'thriller_bark' },
					{ name: 'Guerre Au Sommet', value: 'marineford' },
					{ name: 'Ile des Hommes-Poissons', value:'fishman' },
					{ name: 'Dressrosa', value: 'dressrosa' },
					{ name: 'Whole Cake', value: 'whole_cake' },
					{ name: 'Wano', value: 'wano' },
				)
				.setRequired(true))
		.addStringOption(type =>
			type.setName('type')
				.setDescription('What de you want to list ?')
				.addChoices(
					{ name: 'Episodes', value:'ep' },
					{ name: 'Chapter', value: 'ch' },
				)
				.setRequired(true)),
	async execute(interaction) {

		const next = new ButtonBuilder()
			.setCustomId('next')
			.setLabel('Next page')
			.setStyle(ButtonStyle.Primary);
		const previous = new ButtonBuilder()
			.setCustomId('previous')
			.setLabel('Previous page')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(previous, next);

		const embedResponse = new EmbedBuilder()
			.setColor(0x0099FF)
			.setAuthor({ name: 'OnePieceCU', iconURL:'https://i.imgur.com/VhdmvXC.png' })
			.setDescription('Test')
			.addFields(
				{ name: 'Duration: ', value: 'O' },
				{ name: 'Note: ', value: 'O', inline: true },
				{ name: 'Saga: ', value: 'O', inline: true },
			);


		const getSagaName = (saga) => {
			let sagaName;
			switch (saga) {
			case 'east_blue':
				sagaName = 'East Blue';
				embedResponse.setThumbnail('https://static.wikia.nocookie.net/onepiece/images/0/01/East_Blue_Saga.png/revision/latest?cb=20130125212119')
					.setImage('https://static.wikia.nocookie.net/onepiece/images/0/01/East_Blue_Saga.png/revision/latest?cb=20130125212119');

				break;
			case 'alabasta':
				sagaName = 'Alabasta';
				embedResponse.setThumbnail('https://static.wikia.nocookie.net/onepiece/images/1/16/Arabasta_Saga.png/revision/latest?cb=20130125212258')
					.setImage('https://static.wikia.nocookie.net/onepiece/images/1/16/Arabasta_Saga.png/revision/latest?cb=20130125212258');
				break;
			case 'skypiea':
				sagaName = 'Skypiea';
				embedResponse.setThumbnail(null);
				break;
			case 'water_seven':
				sagaName = 'Water Seven';
				embedResponse.setThumbnail(null);
				break;
			case 'thriller_bark':
				sagaName = 'Thriller Bark';
				embedResponse.setThumbnail(null);
				break;
			case 'marineford':
				sagaName = 'Guerre Au Sommet';
				embedResponse.setThumbnail(null);
				break;
			case 'fishman':
				sagaName = 'Ile des Hommes-Poissons';
				embedResponse.setThumbnail(null);
				break;
			case 'dressrosa':
				sagaName = 'Dressrosa';
				embedResponse.setThumbnail(null);
				break;
			case 'whole_cake':
				sagaName = 'Whole Cake';
				embedResponse.setThumbnail(null);
				break;
			case 'wano':
				sagaName = 'Pays de Wa';
				embedResponse.setThumbnail(null);
				break;
			default:
				break;
			}
			return sagaName;
		};

		async function buildResponseEp(list) {
			for await (const { title, duration, note, saga } of list) {
				const sagaName = getSagaName(saga);
				console.log(`Duration: ${duration}, Note: ${note}, Saga: ${sagaName}`);
				embedResponse.setTitle(title).setDescription('Blahblahblah')
					.setFields(
						{ name: 'Duration: ', value: `${duration}` },
						{ name: 'Note: ', value: `${note}`, inline: true },
						{ name: 'Saga: ', value: `${sagaName}`, inline: true },
					);
				console.log(row);
				interaction.channel.send({ embeds: [embedResponse], components: [row] });
			}
		}


		if (interaction.options.getString('type') === 'ep') {
			if (interaction.options.getString('saga') === 'all') {
				await interaction.reply('La liste de tous les épisodes:');
				const list = await episodes.find({});
				buildResponseEp(list);
			}
			else {
				const list = await episodes.find({ saga: interaction.options.getString('saga') });
				await interaction.reply(`La liste des épisodes de la saga ${interaction.options.getString('saga')}:`);
				buildResponseEp(list);
			}
		}
		else if (interaction.options.getString('type') === 'ch') {
			if (interaction.options.getString('saga') === 'all') {
				await interaction.reply('La liste de tous les chapitres:');
				const list = await chapters.find();
				console.log(list);
			}
			else {
				const list = await chapters.find({ saga: interaction.options.saga });
				console.log(list);
			}
		}
		else {
			console.log(users.find());
		}
	},
};