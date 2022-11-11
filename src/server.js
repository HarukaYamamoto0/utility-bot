import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.sendStatus(200);
});

export default function run() {
  app.listen(PORT, () => {
    console.log("🚀 server started");
  });
}
