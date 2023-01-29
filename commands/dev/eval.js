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
			if (ephemeral) {
				await interaction.deferReply({ ephemeral: true });
			} else {
				await interaction.deferReply();
			}
			let done;
			let works = false;
			try {
				done = await eval(code);
				works = true;
			} catch (e) {
				done = `${e}`;
			}

			let evalEmbed = new EmbedBuilder().setColor(0x562d1a).addFields(
				{
					name: "Input:",
					value: "```js\n" + `${code}` + "```",
				},
				{
					name: "Output:",
					value: "```js\n" + done + "```",
				},
			);

			if (works) {
				evalEmbed = evalEmbed.setTitle("Success");
			} else {
				evalEmbed = evalEmbed.setTitle("Error");
			}

			interaction.editReply({ embeds: [evalEmbed] });
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
