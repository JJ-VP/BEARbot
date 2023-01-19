const { EmbedBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = async (client, oldMember, newMember) => {
	try {
		const channel = oldMember.guild.channels.cache.find((c) => c.name === `bear-log`);
		const oldRoles = oldMember.roles.cache.map((r) => r).join("\n");
		const newRoles = newMember.roles.cache.map((r) => r).join("\n");
		if (!channel) return;
		const embed = new EmbedBuilder()
			.setColor("#0000ff")
			.setTitle(`Member Updated`)
			.addFields({ name: " ", value: `**${oldMember}**\n .` }, { name: "Old Member", value: `${oldMember.displayName}\n\nRoles:\n${oldRoles}`, inline: true }, { name: "New Member", value: `${newMember.displayName}\n\nRoles:\n${newRoles}`, inline: true })
			.setTimestamp()
			.setFooter({ text: "Event logged", iconURL: `${client.user.avatarURL({ format: "png", dynamic: true, size: 512 })}` });

		await channel.send({ embeds: [embed], ephemeral: true });
	} catch (e) {
		error.error(client, e);
	}
};
