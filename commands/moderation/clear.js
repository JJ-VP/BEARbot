const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "clear",
	description: "Clear number of lines or all users!",
	options: [
		{
			name: "lines",
			description: "Number of messages to delete.",
			required: true,
			type: ApplicationCommandOptionType.Number,
		},
		{
			name: "target-user",
			description: "The user to clear.",
			type: ApplicationCommandOptionType.User,
		},
	],
	permissionsRequired: [PermissionFlagsBits.ManageMessages],
	botPermissions: [PermissionFlagsBits.ManageMessages],

	callback: async (client, interaction) => {
		try {
			await interaction.deferReply({ ephemeral: true });
			const lines = interaction.options.getNumber("lines");
			if (lines < 1) {
				await interaction.editReply({ content: `Unable to delete ${lines} lines. Please input a positive number.` });
				return;
			}
			await interaction.deleteReply();
			const user = interaction.options.getUser("target-user");
			const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
			let done = false;

			if (user) {
				interaction.channel.messages.fetch({ limit: lines }).then(async (messages) => {
					const userMessages = messages.filter((m) => m.author.id === user.id);
					await userMessages.forEach(function (value, key) {
						value.delete();
					});
					await interaction.channel.send({ content: `Finished deleting ${lines} messages from ${user}`, allowedMentions: { users: [] } }).then((message) => setTimeout(() => message.delete(), 3000));
				});
				interaction.channel.send(`Deleting ${lines} messages`).then((m) =>
					setTimeout(() => {
						m.delete();
					}, 1000),
				);
			} else {
				try {
					interaction.channel.bulkDelete(lines);
					await interaction.channel.send({ content: `Finished deleting ${lines} messages`, allowedMentions: { users: [] } }).then((message) => setTimeout(() => message.delete(), 3000));
				} catch (e) {
					error.error(client, e, interaction);
				}
			}
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
