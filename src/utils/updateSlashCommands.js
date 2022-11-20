import { REST, Routes } from "discord.js";

async function updateCommands(client, commands = []) {
  const { clientId, tokenBot } = process.env;

  const rest = new REST({ version: "10" }).setToken(tokenBot);
  const data = await rest.put(Routes.applicationCommands(clientId), {
    body: commands,
  });

  return data;
}

export default updateCommands;
