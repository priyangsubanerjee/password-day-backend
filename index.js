const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDatabase = require("./db/connect");
const passwordSchema = require("./db/passwordSchema");

connectDatabase();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/create", require("./routes/create"));
app.use("/hints", require("./routes/hints"));
app.use("/publish", require("./routes/publish"));
app.get("/", (req, res) => {
  res.send("Crack the code if you can!");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
