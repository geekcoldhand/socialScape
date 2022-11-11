const express = require("express");
const routes = require("./controller");
const db = require("./config/connection");

const PORT = process.env.PORT || 3003;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
// once we have connected to server db.once will run
db.once("open", () => {
  app.listen(PORT, () =>
    console.log(`DB now connected and sever listening http://localhost:${PORT}`)
  );
});
