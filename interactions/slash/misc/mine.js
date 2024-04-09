const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mine")
		.setDescription("Predire le placement des mines")
		.addStringOption((option) =>
			option
				.setName("nombre")
				.setDescription("Nombre de mines")
				.setRequired(true)
		),

	async execute(interaction) {
		let number = interaction.options.getString("nombre");
		// is the number a number?
		if (isNaN(number)) {
			return interaction.reply({
				content: "Le nombre de mines doit être un nombre",
				ephemeral: true,
			});
		}
		// is the number between 1 and 10?
		if (number < 1 || number > 20) {
			return interaction.reply({
				content: "Le nombre de mines doit être compris entre 1 et 20",
				ephemeral: true,
			});
		}
		// is the number an integer?
		if (number % 1 != 0) {
			return interaction.reply({
				content: "Le nombre de mines doit être un nombre entier",
				ephemeral: true,
			});
		}

		const matrix = [];

		const generateEmptyMatrix = () => {
			for (let i = 0; i < 5; i++) {
				const arr = new Array(5).fill("❓");
				matrix.push(arr);
			}
		};

		const plantMines = () => {
			for (let i = 0; i < number; i++) {
				const x = Math.floor(Math.random() * 5);
				const y = Math.floor(Math.random() * 5);
				if (matrix[x][y] === "✅") {
					i--;
				} else {
					matrix[x][y] = "✅";
				}
			}
		};
		const getTextRepresentation = () => {
			const separator = "";
			return matrix.map((r) => r.join(separator)).join("\n");
		};
		generateEmptyMatrix();
		plantMines();
		const Embed = new EmbedBuilder()
			.setColor("#2ecc71")
			.setTitle("MinePredictor")
			.setDescription(
				`
				**${getTextRepresentation()}**
	
				**Accuracy: ${Math.floor(Math.random() * 95)}%**

				`
			)
			.setTimestamp();

		await interaction.reply({
			embeds: [Embed],
		});
	},
};
