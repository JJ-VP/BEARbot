const { ApplicationCommandOptionType } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "ping",
	description: "Pong!",
	options: [
		{
			name: "ephemeral",
			description: "Should the bot respond silently?",
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
		const ephemeral = interaction.options.getBoolean("ephemeral") || false;
		if (ephemeral) {
			await interaction.deferReply({ ephemeral: true });
		} else {
			await interaction.deferReply();
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
