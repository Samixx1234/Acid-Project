const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("tower")
		.setDescription("Predire le placement des oeufs"),

	async execute(interaction) {
		const matrix = [];

		const generateEmptyMatrix = () => {
			for (let i = 0; i < 8; i++) {
				const arr = new Array(3).fill("❓");
				matrix.push(arr);
			}
		};

		const plantMines = () => {
			for (let i = 0; i < 3; i++) {
				const x = Math.floor(Math.random() * 8);
				const y = Math.floor(Math.random() * 3);
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
			.setTitle("TowerPredictor")
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
