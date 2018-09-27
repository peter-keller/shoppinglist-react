const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const items = require("./routes/api/items");

const port = process.env.PORT || 5000;

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// Database credentials
const db = require("./config/keys").url;

// Connect to database
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Use routes
app.use("/api/items", items);

// Run server
app.listen(port, () => console.log(`Server started on ${port}`));
