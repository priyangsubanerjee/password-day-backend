const app = require("express").Router();
const passwordSchema = require("../db/passwordSchema");

app.post("/", async (req, res) => {
  const { password, hints, year } = req.body;
  // check if x-api-key header is present
  if (!req.headers["x-api-key"]) return res.send("Authorization required");
  if (req.headers["x-api-key"] !== process.env.CREDENTIAL)
    return res.send("Access denied");
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
