const { ApplicationCommandOptionType } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "say",
	description: "Talk as the bot!",
	devOnly: true,
	options: [
		{
			name: "message",
			description: "What should the bot say?.",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	],

	callback: (client, interaction) => {
		try {
			interaction.deferReply();
			interaction.channel.send(`${interaction.options.getString("message")}`);
			interaction.deleteReply();
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
