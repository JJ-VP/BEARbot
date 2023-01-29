const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "kick",
	description: "Kick a member!",
	options: [
		{
			name: "target-user",
			description: "The user to kick.",
			required: true,
			type: ApplicationCommandOptionType.User,
		},
		{
			name: "reason",
			description: "The reason for kicking.",
			type: ApplicationCommandOptionType.String,
		},
	],
	permissionsRequired: [PermissionFlagsBits.KickMembers],
	botPermissions: [PermissionFlagsBits.KickMembers],

	callback: async (client, interaction) => {
		await interaction.deferReply();
		try {
			const user = interaction.options.getUser("target-user");
			const reason = interaction.options.getString("reason");
			interaction.guild.members.kick(user, { reason: reason });
			if (reason) {
				interaction.editReply(`${interaction.member.displayName} kicked ${user} for ${reason}`);
			} else {
				interaction.editReply(`${interaction.member.displayName} kicked ${user}`);
			}
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
