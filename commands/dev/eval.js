const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "eval",
	description: "Execute code as the bot",
	devOnly: true,
	options: [
		{
			name: "code",
			description: "What should the bot execute.",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
		{
			name: "ephemeral",
			description: "Should the bot respond silently?",
			type: ApplicationCommandOptionType.Boolean,
		},
	],

	callback: async (client, interaction) => {
		try {
			const code = interaction.options.getString("code");
			const ephemeral = interaction.options.getBoolean("ephemeral");
			let done;
			try {
				done = await eval(code);
			} catch (e) {
				done = `${e}`;
			}

			const evalEmbed = new EmbedBuilder()
				.setColor(0x562d1a)
				.setTitle("Success")
				.addFields(
					{
						name: "Input:",
						value: "```js\n" + `${code}` + "```",
					},
					{
						name: "Output:",
						value: "```js\n" + done + "```",
					},
				);

			if (ephemeral) {
				interaction.reply({ embeds: [evalEmbed], ephemeral: true });
			} else {
				interaction.reply({ embeds: [evalEmbed] });
			}
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
