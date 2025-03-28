/**
 * Ce script permet de déployer/rafraîchir les commandes slash (/) sur un serveur Discord.
 * node deploy-commands.js
 */
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const applicationId = process.env.DISCORD_BOT_APPLICATION_ID;
const guildId = process.env.DISCORD_GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARN] La commande ${filePath} manque d'une propriété "data" ou "execute".`);
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Rafraîchissement des ${commands.length} commandes slash (/).`);

		const data = await rest.put(
			Routes.applicationGuildCommands(applicationId, guildId),
			{ body: commands },
		);

		console.log(`${data.length} commandes slash (/) ont bien été mises à jour !`);
	} catch (error) {
		console.error(error);
	}
})();