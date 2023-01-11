const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

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
	],

	callback: async (client, interaction) => {
		try {
			const code = interaction.options.getString("code");
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

			interaction.reply({ embeds: [evalEmbed] });
		} catch (e) {
			console.log(e);
			interaction.reply({
				content: `There was an error performing that command.`,
				ephemeral: true,
			});
		}
	},
};
