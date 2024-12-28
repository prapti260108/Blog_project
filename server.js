const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/db");
const BlogRoutes = require("./Routes/BlogRoutes"); 
const UserRoutes = require("./Routes/UserRoutes"); 

const app = express();

app.use(bodyParser.json());
app.use(cookieParser()); 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use("/blogs", BlogRoutes); 
app.use("/user", UserRoutes);

app.get("/", (req, res) => {
  const user = null; 
  res.render("Navbar", { user });
});
app.get("/user", (req, res) => {
  const user = null; 
  res.render("Navbar", { user });
});

app.listen(7678, () => {
  console.log(`Server running on http://localhost:7688`);
});
