const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "roleadd",
	description: "Add a role to a user!",
	options: [
		{
			name: "target-user",
			description: "The user to add the role to.",
			required: true,
			type: ApplicationCommandOptionType.User,
		},
		{
			name: "role",
			description: "The role you want to add.",
			required: true,
			type: ApplicationCommandOptionType.Role,
		},
	],
	permissionsRequired: [PermissionFlagsBits.BanMembers],
	botPermissions: [PermissionFlagsBits.BanMembers],

	callback: async (client, interaction) => {
		await interaction.deferReply();
		try {
			const user = interaction.options.getUser("target-user");
			const role = interaction.options.getRole("role");
			const guildUser = await interaction.guild.members.cache.get(user.id);
			if (role.managed) return interaction.editReply({ content: `${role} is a bot role and cannot be assigned manually`, ephemeral: true });
			if (!role.editable) return interaction.editReply({ content: `I do not have permission to asign the ${role} role as it is higher than any role I have!`, ephemeral: true });
			if (guildUser.roles.cache.has(role.id)) {
				interaction.editReply({ content: `${user} already has the ${role} role.`, ephemeral: true });
			} else {
				guildUser.roles.add(role).catch(console.log);
				interaction.editReply(`Added ${role} to ${user}`);
			}
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
