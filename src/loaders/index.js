import loadCommands from "./commands.js";
import loadEvents from "./events.js";

export default {
  loadCommands,
  loadEvents,
  async loadAll(client) {
    await loadCommands(client);
    await loadEvents(client);
  },
};
