import { readdirSync } from "fs";
import path from "path";

async function loadEvents(client) {
  client._events = {};
  let totalOfEvents = 0;

  const pathToEvents = new URL("../events/", import.meta.url);
  const subFolders = await readdirSync(pathToEvents);

  for (const folder of subFolders) {
    const fileNames = await readdirSync(new URL(folder, pathToEvents.href));

    for (const fileName of fileNames) {
      const { default: event } = await import(
        `${pathToEvents.href}${folder}/${fileName}`
      );
      const eventName = fileName.split(".")[0];
      totalOfEvents++;

      const eventWithClient = event.bind(event, client);
      if (folder === "bot") client.on(eventName, eventWithClient);
      else if (folder === "process") process.on(eventName, eventWithClient);
    }
  }

  console.log(`[EVENTS] - ${totalOfEvents} events were successfully loaded`);
}

export default loadEvents;
