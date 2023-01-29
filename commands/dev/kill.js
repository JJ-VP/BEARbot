require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "kill",
	description: "Kill the bot!",
	devOnly: true,

	callback: async (client, interaction) => {
		await interaction.deferReply();
		try {
			interaction.editReply("Bye bye :(");
			console.log("Bot killed by " + interaction.user.tag);
			setTimeout(function () {
				process.exit();
			}, 1000);
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
