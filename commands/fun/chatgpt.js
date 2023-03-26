const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");
const { Configuration, OpenAIApi } = require("openai");
const gptLog = require("../../models/gptLog");
const { PasteClient, Publicity, ExpireDate } = require("pastebin-api");

module.exports = {
	name: "chatgpt",
	description: "Talk with the OpenAI Chat GPT chatbot!",
	options: [
		{
			name: "prompt",
			description: "Prompt for the chat bot.",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
		{
			name: "delete-my-data",
			description: "Delete your message history, if set to true prompt is ignored.",
			type: ApplicationCommandOptionType.Boolean,
			default: false,
		},
	],

	callback: async (client, interaction) => {
		const clear = interaction.options.getBoolean("delete-my-data");
		if (clear) {
			const toDelete = await gptLog.findOne({ name: `${interaction.user.tag}` });
			if (toDelete) {
				toDelete.deleteOne();
				await interaction.reply({ content: "You data has been deleted!", ephemeral: true });
			} else {
				await interaction.reply({ content: "We have no data on you, so we regret to inform you that we were unable to delete nothing!", ephemeral: true });
			}
			return;
		}
		try {
			const prompt = interaction.options.getString("prompt");
			if (prompt.length > 500) {
				return interaction.Reply({ content: `Promp was too long, try something a little shorter!`, ephemeral: true });
			}
			await interaction.deferReply();
			const configuration = new Configuration({
				apiKey: process.env.AIAPI,
			});
			const openai = new OpenAIApi(configuration);
			const user = interaction.user.tag;
			let messageLog = await gptLog.findOne({ name: `${user}` });
			if (!messageLog) {
				const newMessageLog = new gptLog({
					name: `${user}`,
					convoLog: { role: `system`, content: `You are a slightly sarcastic chatbot.` },
				});
				await newMessageLog.save();
				messageLog = await gptLog.findOne({ name: `${user}` });
			} else {
				messageLog.convoLog.unshift({ role: `system`, content: `You are a slightly sarcastic chatbot.` });
			}

			messageLog.convoLog.push({
				role: `user`,
				content: prompt,
			});

			try {
				const result = await openai.createChatCompletion({
					model: "gpt-3.5-turbo",
					messages: messageLog.convoLog,
					temperature: 0.7,
					top_p: 1,
					frequency_penalty: 0.5,
				});

				//console.log(result.data);

				if (result.data.choices[0].message.content.length > 1017) {
					const patseClient = new PasteClient(process.env.PASTEAPI);
					const url = await patseClient.createPaste({
						code: `${result.data.choices[0].message.content}`,
						expireDate: ExpireDate.OneDay,
						name: "ChatGPT Response",
						publicity: Publicity.Unlisted,
					});
					actualResult = `The response was too long, you can view it here: ${url}`;
				} else {
					actualResult = result.data.choices[0].message.content;
				}

				while (messageLog.convoLog.length >= 8) {
					messageLog.convoLog.shift();
				}
				messageLog.convoLog.push({ role: `${result.data.choices[0].message.role}`, content: `${result.data.choices[0].message.content}` });
				responseType = "Output";

				await messageLog.save();
			} catch (error) {
				console.log(error);
				actualResult = `${error.response.status}: ${error.response.statusText}\n` + "```" + `${error.response.data.error.message}` + "```";
				//actualResult = `Some text`;
				responseType = "ERROR";
			}

			let outputEmbed = new EmbedBuilder()
				.setColor(0x562d1a)
				.setTitle(`ChatGPT`)
				.addFields(
					{
						name: "Input:",
						value: `${prompt}`,
					},
					{
						name: `${responseType}:`,
						value: `${actualResult}`,
					},
				);
			interaction.editReply({ embeds: [outputEmbed] });
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
