import { Collection, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import loadJson from "@zafriel/dotenvforjson";

async function loadCommands(client) {
  client.commands = new Collection();
  const allCommands = [];

  const pathToCommands = new URL("../commands/", import.meta.url);
  const fileNames = await readdirSync(pathToCommands);
  await loadJson();

  for (const fileName of fileNames) {
    const { default: Command } = await import(`${pathToCommands}/${fileName}`);
    const commandName = fileName.split(".")[0];

    const command = new Command();
    command.setName(commandName);

    allCommands.push(command.toJSON());
    client.commands.set(command.name, command);
  }

  const rest = new REST({ version: "10" }).setToken(process.env.tokenBot);
  const data = await rest.put(
    Routes.applicationCommands(process.env.clientId),
    {
      body: allCommands,
    }
  );

  console.log(
    `[COMMANDS] - ${data.length}/${allCommands.length} commands reloaded successfully`
  );
}

export default loadCommands;
