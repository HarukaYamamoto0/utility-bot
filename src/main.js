import { Client } from "discord.js";
import loaders from "./loaders.js";
import fs from "fs";

const configs = fs.readFileSync("./config.json");
const { tokenBot } = JSON.parse(configs);

(async () => {
  // create the client
  const client = new Client({ intents: 3276799 });

  await loaders.loadCommands(client);
  await loaders.loadEvents(client);

  // log into the bot
  client.login(tokenBot);
})();
