export default async function UncaughtException(client, error, origin) {
  console.log(`Caught exception: ${error}\n` + `Exception origin: ${origin}`);
}
