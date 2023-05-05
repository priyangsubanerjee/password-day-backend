const express = require("express");
const app = express();
const port = 3001 || process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDatabase = require("./db/connect");

connectDatabase();

app.use(
  cors({
    origin: ["https://passwordday.vercel.app/"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/create", require("./routes/create"));
app.use("/hints", require("./routes/hints"));
app.use("/publish", require("./routes/publish"));
app.use("/check", require("./routes/check"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
