import fs from "fs";
import { Collection, REST, Routes } from "discord.js";
const configs = fs.readFileSync("./config.json");
const { clientId, tokenBot } = JSON.parse(configs);

export default {
  async loadCommands(client) {
    client.commands = new Collection();
    const commands = [];

    const commandNames = await fs.readdirSync("./src/commands/");

    for (const fileName of commandNames) {
      const file = await import(`./commands/${fileName}`);

      client.commands.set(file.default.data.name, file.default);

      commands.push(file.default.data.toJSON());
    }

    const rest = new REST({ version: "10" }).setToken(tokenBot);

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log("All commands have been loaded");
  },

  async loadEvents(client) {
    const eventNames = await fs.readdirSync("./src/events/");

    for (const fileName of eventNames) {
      const file = await import(`./events/${fileName}`);
      const eventName = fileName.split(".")[0];

      const eventWithClient = file.default.bind(file.default, client);

      client.on(eventName, eventWithClient);
    }

    console.log("All events have been loaded");
  },
};
