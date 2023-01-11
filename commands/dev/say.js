const { ApplicationCommandOptionType } = require("discord.js");

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
		interaction.deferReply();
		interaction.channel.send(`${interaction.options.getString("message")}`);
		interaction.deleteReply();
	},
};
