const app = require("express").Router();
const passwordSchema = require("../db/passwordSchema");

app.post("/", async (req, res) => {
  if (!req.headers["x-api-key"])
    return res.json({
      status: "400",
      message: "Authorization required",
    });
  if (req.headers["x-api-key"].toString() !== process.env.CREDENTIAL.toString())
    return res.json({
      status: "400",
      message: "Access denied",
    });

  let currentPass = await passwordSchema.findOne({
    year: new Date().getFullYear(),
  });

  if (!currentPass)
    return res.json({
      status: "400",
      message: "No data found",
    });

  let { password } = req.body;
  if (currentPass.password == password)
    return res.json({
      status: "200",
      message: "Correct password",
    });
  else
    return res.json({
      status: "400",
      message: "Wrong password",
    });
});

module.exports = app;
