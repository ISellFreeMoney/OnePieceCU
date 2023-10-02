const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('node:path');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');

const commandsFolders = fs.readdirSync(foldersPath);

for (const folder of commandsFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandsFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WANR] The command ${filePath} is missing ome arguments`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
		}
	}
});
console.log(atob('aHR0cHM6Ly8xNC5tdWdpd2FyYS54eXov'));

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.token);

