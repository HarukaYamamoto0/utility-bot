import BaseCommand from "../../structures/command.js";
import { codeBlock } from "discord.js";

class GenerateJsonFromEmojis extends BaseCommand {
  constructor() {
    super();
    this.setDescription("generate a json containing the server emoji ids");
  }

  async execute(client, interaction) {
    await interaction.deferReply();

    const emojis = await interaction.guild.emojis.fetch();
    const emojiObject = emojis.reduce((json, emoji) => {
      json[emoji.name] = emoji.toString();
      return json;
    }, {});

    const response = JSON.stringify(emojiObject, null, 2).slice(0, 2000);
    await interaction.editReply(codeBlock("js", response));
  }
}

export default GenerateJsonFromEmojis;
