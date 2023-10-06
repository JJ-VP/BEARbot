const { ApplicationCommandOptionType } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "ping",
	description: "Pong!",
	options: [
		{
			name: "ephemeral",
			description: "Should the bot respond silently? (default is true)",
			type: ApplicationCommandOptionType.Boolean,
		},
	],
	// name: String,
	// description: String,
	// devOnly: Boolean,
	// testOnly: Boolean,
	// options: Object[],
	// deleted: Boolean,
	// permissionsRequired: [PermissionFlagsBits],
	// botPermissions: [PermissionFlagsBits],

	callback: async (client, interaction) => {
		const ephemeral = interaction.options.getBoolean("ephemeral");
		if (ephemeral === false) {
			await interaction.deferReply();
		} else {
			await interaction.deferReply({ ephemeral: true });
		}
		try {
			const reply = await interaction.fetchReply();
			const ping = reply.createdTimestamp - interaction.createdTimestamp;
			interaction.editReply(`Client: ${ping}ms\nWebsocket: ${client.ws.ping}ms`);
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
