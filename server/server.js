const express = require("express");
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.json({"fruits": ["apple", "orange", "banana"]});
});

app.get("/jaxon", (req, res) => {
  res.json({"fruits": ["jaxon", "drew", "ach"]});
});

let port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

