const app = require("express").Router();
const passwordSchema = require("../db/passwordSchema");

app.get("/", async (req, res) => {
  const allPasswords = await passwordSchema.find({
    year: new Date().getFullYear(),
  });

  const currentPass = allPasswords[0];
  if (!currentPass) return res.send("No password found");
  const publishedHints = currentPass.hints.filter((hint) => hint.published);
  res.send(publishedHints);
});

module.exports = app;
