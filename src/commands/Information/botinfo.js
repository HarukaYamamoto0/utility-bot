import {
  EmbedBuilder,
  chatInputApplicationCommandMention,
} from "discord.js";
import BaseCommand from "../../structures/command.js";

class Botinfo extends BaseCommand {
  constructor() {
    super();
    this.setDescription("see some information about me");
  }

  async execute(client, interaction) {
    const allCommands = client.commands.map((x) => x);
    const allCommandsOnline = client.updatedCommands;
    const categories = {};
    const fields = [];

    const commandMention = chatInputApplicationCommandMention;

    for (const command of allCommands) {
      const { category, name } = command;
      const { id } = allCommandsOnline.find((x) => x.name === name) ?? 1;

      categories[category] = categories[category] || [];
      categories[category].push(commandMention(name, id));
    }

    for (const category in categories) {
      if (
        category === "Owners" &&
        !process.env.ownerIds.includes(interaction.user.id)
      )
        continue;
      fields.push({
        name: `${category}: (${categories[category].length})`,
        value: categories[category].join(" - "),
      });
    }

    const clientName = client.user.username;
    const avatar = client.user.displayAvatarURL();
    const owner = client.users.cache.get(
      process.env.ownerIds.split(",")[0]
    ).tag;

    const description =
      `Hello ${interaction.user}, my name is **${client.user.username}**, ` +
      `I'm just a personal bot, created by **${owner}**, ` +
      `my main focus is to help my creator, ` +
      `I have a total of **${allCommands.length}** commands`;

    const embed = new EmbedBuilder()
      .setAuthor({ name: "All my slash commands", iconURL: avatar })
      .setThumbnail(avatar)
      .setDescription(description)
      .addFields(fields)
      .setColor(process.env.colorEmbed);

    await interaction.reply({ embeds: [embed] });
  }
}

export default Botinfo;
