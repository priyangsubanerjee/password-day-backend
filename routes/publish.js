const app = require("express").Router();
const passwordSchema = require("../db/passwordSchema");

app.post("/", async (req, res) => {
  let { index, state, credential } = req.body;

  if (credential.toString() !== process.env.CREDENTIAL)
    return res.send("Authentication failed");

  try {
    let password = await passwordSchema.findOne({
      year: new Date().getFullYear(),
    });
    if (!password) return res.send("No password found");

    if (index > password.hints.length) return res.send("Index out of bounds");

    password.hints[index].published = state;

    try {
      await passwordSchema.updateOne(
        {
          year: new Date().getFullYear(),
        },
        {
          $set: {
            hints: password.hints,
          },
        }
      );
      res.send("Updated");
    } catch (error) {
      console.log(error);
      res.send("Error");
    }
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

module.exports = app;
