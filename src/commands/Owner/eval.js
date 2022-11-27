import BaseCommand from "../../structures/command.js";
import { EmbedBuilder, codeBlock } from "discord.js";
import { inspect } from "util";

class Eval extends BaseCommand {
  constructor() {
    super();
    this.setDescription("sample my ping");
    this.addStringOption((option) =>
      option.setName("command").setDescription("the command to be executed").setRequired(true)
    );
  }

  async execute(client, interaction) {
    /* eslint-disable no-unused-vars */
    await interaction.deferReply();

    const command = interaction.options.getString("command");
    const { user, member, guild, channel } = interaction;

    let result = "";
    let resultType = "";

    try {
      const evalResult = (resultType = eval(command));
      const resultToString = typeof evalResult !== "string" ? inspect(evalResult, { depth: 0 }) : evalResult;
      const cutResult = resultToString.slice(0, 1002);

      result = cutResult;
    } catch (error) {
      result = error.message;
      console.log(error);
    }

    const embed = new EmbedBuilder()
      .addFields({
        name: ":inbox_tray: Input: ",
        value: codeBlock("js", command),
      })
      .addFields({
        name: ":outbox_tray: Exit: ",
        value: codeBlock("js", result),
      })
      .addFields({
        name: ":thinking: Output Type: ",
        value: codeBlock("js", typeof resultType),
      })
      .setColor(process.env.colorEmbed);

    await interaction.editReply({ embeds: [embed] });
  }
}

export default Eval;
