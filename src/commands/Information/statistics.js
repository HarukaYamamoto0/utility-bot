import BaseCommand from "../../structures/command.js";
import { EmbedBuilder } from "discord.js";
import { stripIndents } from "common-tags";
import abbreviateNumber from "../../utils/abbreviateNumber.js";
import formatTime from "../../utils/formatTime.js";
import { totalmem, platform } from "os";

class Statistics extends BaseCommand {
  constructor() {
    super();
    this.setDescription("See my stats");
  }

  async execute(client, interaction) {
    // memory information
    const memory = process.memoryUsage();
    const totalMemory = (totalmem() / 1024 / 1024 / 1024).toFixed(2) + "GB";
    const usedMemory = (memory.heapUsed / 1024 / 1024).toFixed(2) + "MB";

    const botinfo = stripIndents`
    > Ping: **${client.ws.ping}ms**
    > Agreed time: **${formatTime(Date.now() - client.readyAt)}**
    > Total Users: **${abbreviateNumber(client.users.cache.size)}**
    > Total Servers: **${abbreviateNumber(client.guilds.cache.size)}**
    > Total Commands: **${abbreviateNumber(client.commands.size)}**
    `;

    const hostinfo = stripIndents`
    > Platform: **${platform()}**
    > Total Memory: **${totalMemory}**
    > Used memory: **${usedMemory}**
    `;

    const embed = new EmbedBuilder()
      .setThumbnail("https://imgur.com/4QyYFlS.png")
      .addFields({ name: "Bot Information", value: botinfo })
      .addFields({ name: "Host Information", value: hostinfo })
      .setColor(process.env.colorEmbed);

    await interaction.reply({ embeds: [embed] });
  }
}

export default Statistics;
