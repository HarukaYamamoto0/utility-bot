import { Client } from "discord.js";
import loaders from "./loaders/index.js";
import loadJson from "@zafriel/dotenvforjson";
import server from "./server.js";

(async () => {
  // create the client
  const client = new Client({ intents: 3276799 });

  await loadJson(); // loads environment variables
  await loaders.loadCommands(client);
  await loaders.loadEvents(client);
  await server(); // starts a web server

  // login to the bot
  client.login(process.env.tokenBot);
  console.log("[INDEX] - index successfully loaded");
})();
