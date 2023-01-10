const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

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
			type: ApplicationCommandOptionType.Mentionable,
		},
	],
	permissionsRequired: [PermissionFlagsBits.ManageMessages],
	botPermissions: [PermissionFlagsBits.ManageMessages],

	callback: async (client, interaction) => {
		const lines = interaction.options.getNumber("lines");
		const user = interaction.options.getMentionable("target-user");
		const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

		if (user) {
			interaction.channel.messages.fetch().then((messages) => {
				let userMessages = messages.filter((m) => m.author === user);
				for (let message of userMessages) {
					message.delete();
				}
			});
			interaction.reply(`Deleted ${lines} messages`);
			await sleep(3000);
			interaction.deleteReply();
		} else {
			try {
				interaction.channel.bulkDelete(lines);
				interaction.reply(`Deleted ${lines} messages`);
				await sleep(3000);
				interaction.deleteReply();
			} catch (e) {
				console.log(e);
			}
		}
	},
};
