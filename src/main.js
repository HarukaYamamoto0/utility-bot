import { Client } from "discord.js";
import botSettings from "./configs/bot.js";
import loaders from "./loaders/index.js";
import server from "./server.js";

(async () => {
  // create the client
  const client = new Client({ intents: botSettings.intents });

  await loaders.loadCommands(client);
  await loaders.loadEvents(client);
  await server(); // starts a web server

  // login to the bot
  client.login(process.env.tokenBot);
  console.log("[INDEX] - index successfully loaded");
})();
