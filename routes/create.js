const app = require("express").Router();
const passwordSchema = require("../db/passwordSchema");

app.post("/", async (req, res) => {
  const { password, credential, hints, year } = req.body;
  if (credential !== 2406) return res.send("Authentication failed");
  try {
    await passwordSchema.create({
      password,
      hints,
      year,
    });
    res.send("Created");
  } catch (error) {
    console.log(error.message);
    res.send("Error");
  }
});

module.exports = app;
