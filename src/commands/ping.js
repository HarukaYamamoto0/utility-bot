import { SlashCommandBuilder } from "discord.js";

class Ping extends SlashCommandBuilder {
  constructor() {
    super();
    this.setDescription("reply with pong");
  }

  async execute(interaction) {
    await interaction.reply("Pong!");
  }
}

export default Ping;
