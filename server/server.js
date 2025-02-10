const express = require("express");
const sqliteDB = require("./db/sqlite");
const userRoutes = require("./routes/userRoutes");
// const connectMongo = require("./db/mongo");

const app = express();
const cors = require('cors');
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use("/users", userRoutes);

// Connect databases
// connectMongo(); // MongoDB setup in the future

// Ex. route with SQLite3
app.get("/users", async (req, res) => {
  const users = await sqliteDB.select("*").from("users");
  res.json(users);
});

// From YouTube video
// app.get("/api", (req, res) => {
//   res.json({"fruits": ["apple", "orange", "banana"]});
// });

let port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

