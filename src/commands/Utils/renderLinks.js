import BaseCommand from "../../structures/command.js";

class RenderLink extends BaseCommand {
  constructor() {
    super();
    this.setDescription("render the links in your message");
    this.addStringOption((option) =>
      option.setName("message").setDescription("the message with links to be rendered").setRequired(true)
    );
  }

  async execute(client, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const message = interaction.options.getString("message");
    const username = interaction.user.username;
    const avatar = interaction.user.displayAvatarURL({ dynamic: true });

    const webhook = await interaction.channel.createWebhook({
      name: username,
      avatar: avatar,
    });

    await webhook.send(message);
    await webhook.delete();

    await interaction.editReply("Message sent successfully");
  }
}

export default RenderLink;
