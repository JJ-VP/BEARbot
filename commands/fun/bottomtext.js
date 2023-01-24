const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");
const Canvas = require("@napi-rs/canvas");

module.exports = {
	name: "bottomtext",
	description: "Add text to the bottom of an image!",
	options: [
		{
			name: "image",
			description: "The image you want to add text too.",
			required: true,
			type: ApplicationCommandOptionType.Attachment,
		},
		{
			name: "text",
			description: "The text you want to add to the image.",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	],

	callback: async (client, interaction) => {
		try {
			const file = interaction.options.getAttachment("image");
			const text = interaction.options.getString("text");
			const extension = file.name.split(".").pop().toLowerCase();
			const allowedTypes = ["png", "jpg", "jpeg", "avif", "webp", "gif"];
			if (allowedTypes.indexOf(extension) < 0) return interaction.reply({ content: `The filetype you surplied is not supported by this command :png, jpg, jpeg, avif, webp, gif(animated soon)`, ephemeral: true });

			const canvas = Canvas.createCanvas(file.width, file.height);
			const context = canvas.getContext("2d");
			const background = await Canvas.loadImage(`${file.url}`);
			context.drawImage(background, 0, 0, canvas.width, canvas.height);
			const applyText = (canvas, text) => {
				let fontSize = 100;
				do {
					context.font = `${(fontSize -= 1)}px Impact`;
				} while (context.measureText(text).width > canvas.width / 1.1);
				return context.font;
			};
			context.font = applyText(canvas, text);
			context.fillStyle = "white";
			context.textAlign = "center";
			context.fillText(text, canvas.width / 2, canvas.height / 1.05);
			context.strokeStyle = "black";
			context.strokeText(text, canvas.width / 2, canvas.height / 1.05);
			const Attachment = new AttachmentBuilder(await canvas.encode(`png`), { name: `bottomText.png` });
			interaction.reply({ files: [Attachment] });
			//I don't like how this works... but it works.
		} catch (e) {
			console.log(e);
			error.error(client, e, interaction);
		}
	},
};
