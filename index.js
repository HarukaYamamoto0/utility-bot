import { Client } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

(async () => {
  // create the client
  const client = new Client({ intents: 3276799 });

  // hear the events
  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.username}`);
  });

  // log into the bot
  client.login(process.env.tokenBot);
})();
