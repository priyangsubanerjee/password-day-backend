const app = require("express").Router();
const passwordSchema = require("../db/passwordSchema");

app.get("/", async (req, res) => {
  let currentPass = await passwordSchema.findOne({
    year: new Date().getFullYear(),
  });

  if (!currentPass) return res.send("No password found");

  let publishedHints = currentPass.hints.filter((hint) => {
    if (!hint.published) {
      hint.description = "This hint has not been published yet";
    }
    return hint;
  });

  res.send({
    hints: publishedHints,
    totalHints: currentPass.hints.length,
  });
});

module.exports = app;
