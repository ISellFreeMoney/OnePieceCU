const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(foldersPath);

for (const folder of commandsFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandsFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		}
		else {
			console.log(`[WANR] The command ${filePath} is missing ome arguments`);
		}
	}
}

const rest = new REST().setToken(process.env.token);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationCommands(process.env.client_id),
			{ body: commands },
		);
		console.log(`Successfully realoded ${data.length} application (/) commands.`);
	}
	catch (error) {
		console.error(error);
	}
})();