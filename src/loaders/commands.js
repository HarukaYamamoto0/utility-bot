import { Collection, REST, Routes } from "discord.js";
import { readdirSync } from "fs";

async function loadCommands(client) {
  client.commands = new Collection();
  const allCommands = [];

  const pathToCommands = new URL("../commands/", import.meta.url);
  const categoryNames = await readdirSync(pathToCommands);

  for (const category of categoryNames) {
    const pathToCategory = new URL(category, pathToCommands.href);
    const fileNames = await readdirSync(pathToCategory);

    for (const fileName of fileNames) {
      const { default: Command } = await import(
        `${pathToCommands.href}${category}/${fileName}`
      );
      const commandName = fileName.split(".")[0];

      const command = new Command();
      command.setName(commandName);
      command.category = category;

      allCommands.push(command.toJSON());
      client.commands.set(command.name, command);
    }
}
    const rest = new REST({ version: "10" }).setToken(process.env.tokenBot);
    const data = await rest.put(
      Routes.applicationCommands(process.env.clientId),
      {
        body: allCommands,
      }
    );
    client.updatedCommands = data;

    console.log(
      `[COMMANDS] - ${data.length}/${allCommands.length} commands reloaded successfully`
    );
  
}

export default loadCommands;
