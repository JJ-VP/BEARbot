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
		await interaction.deferReply();
		try {
			const lines = interaction.options.getNumber("lines");
			const user = interaction.options.getUser("target-user");
			const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
			let done = false;

			if (user) {
				interaction.channel.messages.fetch({ limit: lines }).then(async (messages) => {
					const userMessages = messages.filter((m) => m.author.id === user.id);
					await userMessages.forEach(function (value, key) {
						value.delete();
					}); //Send finished message before it has actually finished :(
					await interaction.channel.send({ content: `Finished deleting ${lines} messages from ${user}`, allowedMentions: { users: [] } }).then((message) => setTimeout(() => message.delete(), 3000));
				});
				interaction.editReply(`Deleting ${lines} messages`);
				await sleep(3000);
				interaction.deleteReply();
			} else {
				try {
					interaction.channel.bulkDelete(lines);
					interaction.editReply(`Deleted ${lines} messages`);
					await sleep(3000);
					interaction.deleteReply();
				} catch (e) {
					console.log(e);
				}
			}
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
