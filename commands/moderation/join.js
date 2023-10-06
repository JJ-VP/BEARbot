const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const error = require("../../handlers/errorHandler.js");
const selfRoles = require("../../models/selfRoles");

module.exports = {
	name: "join",
	description: "Join an auto-role.",
	options: [
		{
			name: "role",
			description: "The role you want.",
			required: true,
			type: ApplicationCommandOptionType.Role,
		},
		{
			name: "silent",
			description: "Should the reply only be sent to you?",
			required: false,
			default: false,
			type: ApplicationCommandOptionType.Boolean,
		},
	],
	botPermissions: [PermissionFlagsBits.ManageRoles],

	callback: async (client, interaction) => {
		const ephemeral = interaction.options.getBoolean("silent");
		if (ephemeral || ephemeral === null) {
			await interaction.deferReply({ ephemeral: true });
		} else {
			await interaction.deferReply({ ephemeral: false });
		}
		try {
			const role = interaction.options.getRole("role");
			server = await selfRoles.findOne({ server: `${interaction.guildId}` });
			if (!server) {
				const newRoles = new selfRoles({
					server: `${interaction.guildId}`,
					roles: [],
				});
				await newRoles.save();
				server = await selfRoles.findOne({ server: `${interaction.guildId}` });
			}
			if (server.roles.includes(role)) {
				interaction.guild.members
					.addRole({
						user: interaction.user,
						role: role,
						reason: `Selfrole assigned`,
					})
					.then(() => {
						interaction.editReply(`Joined ${role}`);
					});
			} else {
				interaction.editReply(`${role} is not a role that can be self-assigned.`);
			}
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
