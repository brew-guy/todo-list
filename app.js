const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let dailyItems = ["Cat food", "Plutonium", "Milk"];
let workItems = ["Code", "Practice code", "Refactor code"];

// Routes
app.get("/", (req, res) => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const today = new Date();
  const day = today.toLocaleDateString("en-US", options);
  res.render("list", { listTitle: day, list: dailyItems });
});

app.post("/", (req, res) => {
  dailyItems.push(req.body.newItem);
  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work Items", list: workItems });
});

app.post("/work", (req, res) => {
  workItems.push(req.body.newItem);
  res.redirect("/work");
});

// Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
