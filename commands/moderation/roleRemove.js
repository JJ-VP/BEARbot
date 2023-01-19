const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "roleremove",
	description: "Remove a role to a user!",
	options: [
		{
			name: "target-user",
			description: "The user to remove the role from.",
			required: true,
			type: ApplicationCommandOptionType.User,
		},
		{
			name: "role",
			description: "The role you want to remove.",
			required: true,
			type: ApplicationCommandOptionType.Role,
		},
	],
	permissionsRequired: [PermissionFlagsBits.ManageRoles],
	botPermissions: [PermissionFlagsBits.ManageRoles],

	callback: async (client, interaction) => {
		try {
			const user = interaction.options.getUser("target-user");
			const role = interaction.options.getRole("role");
			const guildUser = await interaction.guild.members.cache.get(user.id);
			if (guildUser.roles.cache.has(role.id)) {
				guildUser.roles.remove(role).catch(console.log);
				interaction.reply(`Removed ${role} from ${user}`);
			} else {
				interaction.reply({ content: `${user} does not have the ${role} role.`, ephemeral: true });
			}
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
