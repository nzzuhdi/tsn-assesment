require("dotenv").config();
const express = require("express");
const connect = require("./config/mongodb");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const port = 3000 || process.env.PORT;

app.use([cors(), express.urlencoded({ extended: true }), express.json()]);
app.use(routes);
connect().then(async () => {
  app.listen(port, () => {
    console.log("listening on " + port);
  });
});
