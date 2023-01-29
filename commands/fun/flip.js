const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "flip",
	description: "Flip a coin!",

	callback: async (client, interaction) => {
		await interaction.deferReply();
		try {
			const options = ["Heads", "Tails"];
			let random = options[Math.floor(Math.random() * options.length)];
			interaction.editReply(`The coin landed on: ${random}`);
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
