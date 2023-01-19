const { ApplicationCommandOptionType } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "roll",
	description: "Roll a dice!",
	options: [
		{
			name: "number",
			description: "Number of dice to roll.",
			required: true,
			type: ApplicationCommandOptionType.Integer,
		},
		{
			name: "size",
			description: "Sides on the dice.",
			required: true,
			type: ApplicationCommandOptionType.Integer,
		},
	],

	callback: (client, interaction) => {
		try {
			const number = interaction.options.getInteger("number");
			const size = interaction.options.getInteger("size");
			let results = [];
			for (let i = 0; i < number; i++) {
				let random = Math.floor(Math.random() * size + 1);
				results.push(`[${random}/${size}]`);
			}
			interaction.reply(`The dice landed on: ${results}`);
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
