const create = require("express").Router();

create.get("/", async (req, res) => {
  res.send("create");
});

module.exports = create;
