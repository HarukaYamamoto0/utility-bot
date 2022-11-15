import BaseCommand from "../../structures/command.js";
import { EmbedBuilder, codeBlock } from "discord.js";
import wait from "../../utils/wait.js";
import { promisify } from "util";
import { exec } from "child_process";
const execSync = promisify(exec);

class Shell extends BaseCommand {
  constructor() {
    super();
    this.setDescription("run terminal command from here.")
    this.addStringOption((option) =>
      option
        .setName("command")
        .setDescription("the command to be executed")
        .setRequired(true)
    );
  }

  async execute(client, interaction) {
    await interaction.deferReply();
    
    const command = interaction.options.getString("command");
    const [error, data] = await wait(execSync(command));
    
    const stdout = data?.stdout.slice(0, 1002);
    const stderr = data?.stderr.slice(0, 1002)
  
    const embed = new EmbedBuilder()
      .addFields({ name: ":inbox_tray: Input: ", value: codeBlock("js", command) })
      .addFields({ name: ":outbox_tray: Stdout: ", value: codeBlock("js", stdout ?? "nothing here") })
      .addFields({ name: ":outbox_tray: Stderr: ", value: codeBlock("js", error ?? stderr ?? "nothing here") })
      .setColor(process.env.colorEmbed);
    
    await interaction.editReply({ embeds: [embed], ephemeral: true });
  }
}

export default Shell;
