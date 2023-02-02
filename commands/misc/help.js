const { EmbedBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");
const getLocalCommands = require("../../utils/getLocalCommands.js");

module.exports = {
	name: "help",
	description: "See all bot command!",

	callback: async (client, interaction) => {
		await interaction.deferReply({ ephemeral: true });
		try {
			let embeds = [];
			let embedCount = 0;
			const localCommands = getLocalCommands();
			let commands = [];
			for await (const localCommand of localCommands) {
				const { name, description, options } = localCommand;
				if (options) {
					arrayOptions = [`Options:\n`];
					options.forEach((option, i) => {
						let type;
						switch (option.type) {
							case 1:
								type = `Sub Command`;
								break;
							case 2:
								type = `Sub Command Group`;
								break;
							case 3:
								type = `String`;
								break;
							case 4:
								type = `Integer`;
								break;
							case 5:
								type = `Boolean`;
								break;
							case 6:
								type = `User`;
								break;
							case 7:
								type = `Channel`;
								break;
							case 8:
								type = `Role`;
								break;
							case 9:
								type = `Mentionable`;
								break;
							case 10:
								type = `Number`;
								break;
							case 11:
								type = `Attachment`;
								break;
							default:
								type = `Unknown type`;
						}
						let string = `${type}- ${option.description}\n`;
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
