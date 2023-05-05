const app = require("express").Router();
const passwordSchema = require("../db/passwordSchema");

app.get("/", async (req, res) => {
  const passwords = await passwordSchema.find({});
  res.send(passwords);
});

module.exports = app;
