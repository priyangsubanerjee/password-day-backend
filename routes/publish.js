const app = require("express").Router();
const passwordSchema = require("../db/passwordSchema");

app.post("/", async (req, res) => {
  let { index, state } = req.body;

  if (!req.headers.token) res.send("Authorization required");

  if (req.headers.token !== process.env.CREDENTIAL)
    return res.send("Access denied");

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
