const { EmbedBuilder } = require("discord.js");

module.exports = async (client, guildChannel) => {
	const channel = guildChannel.guild.channels.cache.find((c) => c.name === `bear-log`);
	if (!channel) return;
	const embed = new EmbedBuilder()
		.setColor("#ff0000")
		.setTitle("BEAR Logger")
		.addFields({ name: "Channel Deleted", value: `${guildChannel.name}` })
		.setTimestamp()
		.setFooter({ text: "Event logged", iconURL: `${client.user.avatarURL({ format: "png", dynamic: true, size: 512 })}` });

	await channel.send({ embeds: [embed], ephemeral: true });
};
