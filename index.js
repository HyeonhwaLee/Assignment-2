const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const app = express();

//sets our view engine to load files ending in .ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(expressSession({
  resave: false,
  saveUninitialized:true,
  secret: "very secret key"
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = 3000;

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", (req, res) => {
  let user = req.session.user;

  res.render("profile", {user});
});

app.get("/faq", (req, res) => {
  res.render("faq");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/slides", (req, res) => {
  res.render("slide-show");
});

app.post("/update-profile", (req, res) => {
  console.log(req.body);

  req.session.user = req.body;

  res.redirect("/profile")
})