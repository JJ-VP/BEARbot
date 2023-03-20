const { EmbedBuilder } = require("discord.js");

module.exports = {
	error: async (client, error, interaction) => {
		try {
			console.log(error);
			let devs = ["176721924448059402"];
			if (interaction) {
				let size = Object.keys(interaction.options._hoistedOptions).length;
				let options = "";
				for (let i = 0; i < size; i++) {
					options = options + `${interaction.options._hoistedOptions[i].name}: *${interaction.options._hoistedOptions[i].value}*\n`;
				}
				if (options == "") {
					options = "No Options";
				}
				const embedReply = new EmbedBuilder()
					.setColor("#ff0000")
					.setTitle(`Error`)
					.addFields({ name: "Command:", value: `${interaction.command.name}` }, { name: "Options:", value: `${options}` }, { name: "error:", value: `${error}` })
					.setTimestamp()
					.setFooter({ text: "Error logged", iconURL: `${client.user.avatarURL({ format: "png", dynamic: true, size: 512 })}` });

				const embedDev = new EmbedBuilder()
					.setColor("#ff0000")
					.setTitle("Error")
					.addFields({ name: "command", value: `${interaction.command.name}` }, { name: "Options:", value: `${options}` }, { name: "Guild:", value: `${interaction.guild}` }, { name: "Channel", value: `${interaction.channel}` }, { name: "User:", value: `${interaction.user}` }, { name: "Error:", value: `${error}` })
					.setTimestamp()
					.setFooter({ text: "Error logged", iconURL: `${client.user.avatarURL({ format: "png", dynamic: true, size: 512 })}` });

				await interaction.editReply({ embeds: [embedReply], ephemeral: true });
				devs.forEach((dev) => {
					client.users.cache.get(dev).send({ embeds: [embedDev] });
				});
			} else {
				const embedDev = new EmbedBuilder()
					.setColor("#ff0000")
					.setTitle("Error")
					.addFields({ name: "Error:", value: `${error}` })
					.setTimestamp()
					.setFooter({ text: "Error logged", iconURL: `${client.user.avatarURL({ format: "png", dynamic: true, size: 512 })}` });

				devs.forEach((dev) => {
					client.users.cache.get(dev).send({ embeds: [embedDev] });
				});
			}
		} catch (e) {
			console.log(e);
		}
	},
};
