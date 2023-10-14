const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const error = require("../../handlers/errorHandler.js");
const selfRoles = require("../../models/selfRoles");

module.exports = {
	name: "role",
	description: "Role manager",
	testOnly: false,
	deleted: false,
	options: [
		{
			name: "create",
			description: "Create a role.",
			required: false,
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "role-name",
					description: "The name of the new role.",
					required: true,
					type: ApplicationCommandOptionType.String,
				},
				{
					name: "silent",
					description: "Should the reply only be sent to you?",
					required: false,
					default: false,
					type: ApplicationCommandOptionType.Boolean,
				},
			],
		},
		{
			name: "delete",
			description: "Delete a role.",
			required: false,
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "role",
					description: "The role to delete.",
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
		},
		{
			name: "add",
			description: "Add a role to a user.",
			required: false,
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "target-user",
					description: "The user to add the role too.",
					required: true,
					type: ApplicationCommandOptionType.User,
				},
				{
					name: "role",
					description: "The role to add.",
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
		},
		{
			name: "remove",
			description: "Remove a role to a user.",
			required: false,
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "target-user",
					description: "The user to remove the role too.",
					required: true,
					type: ApplicationCommandOptionType.User,
				},
				{
					name: "role",
					description: "The role to remove.",
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
		},
		{
			name: "autoadd",
			description: "Add a role that users can give themself.",
			required: false,
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "role",
					description: "The role you want to add to the role give list.",
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
		},
		{
			name: "autoremove",
			description: "Remove a role that users can give themself.",
			required: false,
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "role",
					description: "The role you want to remove from the role give list.",
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
		},
		{
			name: "autolist",
			description: "List all roles that users can give themself.",
			required: false,
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "silent",
					description: "Should the reply only be sent to you?",
					required: false,
					default: false,
					type: ApplicationCommandOptionType.Boolean,
				},
			],
		},
	],
	permissionsRequired: [PermissionFlagsBits.ManageRoles],
	botPermissions: [PermissionFlagsBits.ManageRoles],

	callback: async (client, interaction) => {
		const ephemeral = interaction.options.getBoolean("silent");
		if (ephemeral || ephemeral === null) {
			await interaction.deferReply({ ephemeral: true });
		} else {
			await interaction.deferReply({ ephemeral: false });
		}
		try {
			const command = interaction.options.getSubcommand();
			const roleName = interaction.options.getString("role-name");
			const user = interaction.options.getUser("target-user");
			const role = interaction.options.getRole("role");
			switch (command) {
				case "create":
					interaction.guild.roles
						.create({
							name: `${roleName}`,
							reason: `${interaction.user.username} created role using /role create.`,
						})
						.then((role) => {
							interaction.editReply(`Created role ${role}`);
						})
						.catch((error) => {
							interaction.editReply(`Unable to create role!\n\`\`\`${error}\`\`\``);
						});
					break;

				case "delete":
					interaction.editReply(`Deleted role ${role.name}`);
					interaction.guild.roles.delete(role.id, `${interaction.user.username} deleted role using /role delete.`);
					break;

				case "add":
					if (role.managed) return interaction.editReply({ content: `${role} is a bot role and cannot be assigned manually`, ephemeral: true });
					if (!role.editable) return interaction.editReply({ content: `I do not have permission to asign the ${role} role as it is higher than any role I have!`, ephemeral: true });
					interaction.guild.members
						.addRole({
							user: user,
							role: role,
							reason: `${interaction.user.username} added ${role.name} to ${user.username} using /role add`,
						})
						.then((updatedUser) => {
							interaction.editReply(`Added ${role} to ${updatedUser}`);
						});
					break;

				case "remove":
					if (role.managed) return interaction.editReply({ content: `${role} is a bot role and cannot be assigned manually`, ephemeral: true });
					if (!role.editable) return interaction.editReply({ content: `I do not have permission to asign the ${role} role as it is higher than any role I have!`, ephemeral: true });
					interaction.guild.members
						.removeRole({
							user: user,
							role: role,
							reason: `${interaction.user.username} removed ${role.name} from ${user.username} using /role remove`,
						})
						.then((updatedUser) => {
							interaction.editReply(`Removed ${role} from ${updatedUser}`);
						});
					break;

				case "autoadd":
					server = await selfRoles.findOne({ server: `${interaction.guildId}` });
					if (!server) {
						const newServer = new selfRoles({
							server: `${interaction.guildId}`,
							roles: [],
						});
						await newServer.save();
					}

					server = await selfRoles.findOne({ server: `${interaction.guildId}` });

					if (server.roles.includes(role.id)) {
						interaction.editReply(`Could not add ${role} to role list as it already exists. Use \`/role autoremove\` to remove it or \`/role autolist\` to see the full list of roles.`);
					} else {
						server.roles.push(role.id);
						interaction.editReply(`Added ${role} to the list of auto roles.`);
					}
					await server.save();
					break;

				case "autoremove":
					server = await selfRoles.findOne({ server: `${interaction.guildId}` });
					if (server.roles.includes(role.id)) {
						server.roles.splice(server.roles.indexOf(role.id));
						interaction.editReply(`Deleted ${role} from the list of auto roles.`);
					} else {
						interaction.editReply(`${role} Is not in the list of auto roles. Use \`/role autoadd\` to add it or \`/role autolist\` to see the full list of roles.`);
					}
					await server.save();
					break;

				case "autolist":
					server = await selfRoles.findOne({ server: `${interaction.guildId}` });
					if (!server) {
						const newRoles = new selfRoles({
							server: `${interaction.guildId}`,
							roles: [],
						});
						await newRoles.save();
						server = await selfRoles.findOne({ server: `${interaction.guildId}` });
					}
					roleArray = [];
					server.roles.forEach((role) => {
						roleArray.push(interaction.guild.roles.cache.get(role));
					});
					interaction.editReply(`Roles that users can give themself:\n${roleArray.join(`\n`)}`);
					break;

				default:
					interaction.editReply(`The role command requires you to specify a subCommand`);
					break;
			}
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
