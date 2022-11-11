export default async function UnhandledRejection(client, reason, promise) {
  console.log("[PROCESS] - Some promise was not handled correctly!");
  console.error(reason, promise);
}
