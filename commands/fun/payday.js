const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "randomiser",
	description: "Payday 3 stratergy randomiser!",
	options: [
		{
			name: "stealthloud",
			description: "Stealth or loud? True for stealth, False for loud or leave it blank for either.",
			type: ApplicationCommandOptionType.Boolean,
		},
		{
			name: "modifiers",
			description: "How many modifiers should be applied? (1 recommended)",
			type: ApplicationCommandOptionType.Integer,
		},
		{
			name: "debug",
			description: "Debug setting, please ignore. =)",
			type: ApplicationCommandOptionType.Boolean,
		},
	],

	callback: async (client, interaction) => {
		await interaction.deferReply();
		try {
			const allModifiers = ["No moving while shooting", "Always crouch", "No jumping/vaulting", "No skills", "Only 1 skill tree", "Only walk backwards", "Only walk sideways", "Max sensitivity", "Min sensitivity"];
			const stealthModifiers = ["Mask off", "Mask on", "No pagers"];
			const loudModifiers = ["Primary only", "Pistol only", "No downs"];
			let stealth = interaction.options.getBoolean("stealthloud");
			let modifierCount = interaction.options.getInteger("modifiers");
			const debug = interaction.options.getBoolean("debug");

			if (stealth === null) {
				stealth = Math.round(Math.random());
			}
			if (modifierCount === null) {
				modifierCount = 1;
			}

			const mapList = ["No Rest For The Wicked", "Dirty Ice", "Rock the Cradle", "Under The Surphaze", "Gold & Sharke", "99 Boxes", "Touch The Sky"];
			if (!stealth || debug) {
				mapList.push("Road Rage");
			}
			const map = mapList[Math.floor(mapList.length * Math.random())];

			const difficultyList = ["Normal", "Hard", "Very Hard", "Overkill"];
			const difficulty = difficultyList[Math.floor(difficultyList.length * Math.random())];

			if (debug && interaction.user.id == 176721924448059402) {
				interaction.editReply(`## Debug\n**maps:**\n${mapList.join(", ")}\n\n**difficulties:**\n${difficultyList.join(", ")}\n\n**general modifiers:**\n${allModifiers.join(", ")}\n\n**stealth modifiers:**\n${stealthModifiers.join(", ")}\n\n**loud modifiers:**\n${loudModifiers.join(", ")}`);
				return;
			}

			if (stealth) {
				//Stealth
				var modifierList = allModifiers.concat(stealthModifiers);
				var modifiers = [];
				for (let i = 0; i < modifierCount; i++) {
					var int = Math.floor(modifierList.length * Math.random());
					var random = modifierList[int];
					if (i) {
						modifiers = modifiers + "\n" + random;
					} else {
						modifiers = modifiers + random;
					}
					modifierList.splice(int, 1);
				}
				stealth = "Stealth";
			} else {
				//Loud
				var modifierList = allModifiers.concat(loudModifiers);
				var modifiers = [];
				for (let i = 0; i < modifierCount; i++) {
					var int = Math.floor(modifierList.length * Math.random());
					var random = modifierList[int];
					if (i) {
						modifiers = modifiers + "\n" + random;
					} else {
						modifiers = modifiers + random;
					}
					modifierList.splice(int, 1);
				}

				stealth = "Loud";
			}

			if (modifierCount > 12) {
				interaction.editReply(`I don't have that many modifiers, the max is currently 12!`);
			} else {
				let paydayEmbed = new EmbedBuilder()
					.setColor(0x562d1a)
					.setTitle(`Payday 3 Randomiser`)
					.addFields(
						{
							name: "Map:",
							value: `${map}`,
						},
						{
							name: "Difficulty",
							value: `${difficulty}`,
						},
						{
							name: "Stratergy:",
							value: `${stealth}`,
						},
					);
				if (modifierCount > 1) {
					paydayEmbed.addFields({
						name: "Modifiers:",
						value: `${modifiers}`,
					});
				} else {
					paydayEmbed.addFields({
						name: "Modifier:",
						value: `${modifiers}`,
					});
				}
				interaction.editReply({ embeds: [paydayEmbed] });
			}
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
