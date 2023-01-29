const { EmbedBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");
const getLocalCommands = require("../../utils/getLocalCommands.js");

module.exports = {
	name: "help",
	description: "See all bot command!",

	callback: async (client, interaction) => {
		await interaction.deferReply();
		try {
			let embeds = [];
			let embedCount = 0;
			const localCommands = getLocalCommands();
			let commands = [];

			for await (const localCommand of localCommands) {
				const { name, description, options } = localCommand;
				if (options) {
					arrayOptions = [];
					options.forEach((option, i) => {
						let string = `Option${i + 1}:${option.description}\n`;
						arrayOptions.push(string);
					});
					let array = [name, description, arrayOptions];
					commands.push(array);
				} else {
					array = [name, description];
					commands.push(array);
				}
			}
			commands.forEach((e, i) => {
				if (!embeds[Math.floor(embedCount / 25)]) {
					embeds.push(new EmbedBuilder().setColor(0x562d1a).addFields().setTimestamp());
				}
				if (commands[i][2]) {
					embeds[Math.floor(embedCount / 25)].addFields({
						name: `${commands[i][0]}`,
						value: `\`\`\`${commands[i][1]}\n${commands[i][2].join("")}\`\`\``,
					});
				} else {
					embeds[Math.floor(embedCount / 25)].addFields({
						name: `${commands[i][0]}`,
						value: `\`\`\`${commands[i][1]}\`\`\``,
					});
				}
				embedCount++;
			});
			await interaction.editReply({ embeds: [embeds[0]] });
			embeds.shift();
			embeds.forEach(async (e) => {
				await interaction.followUp({ embeds: [e] });
			});
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
