const express = require("express");
require("./mongoDBconnect/connectToDB");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRouter = require("./routers/users/userRouter");
const imageRouter = require("./routers/images/imagesRouter");
const adminRouter = require("./routers/admin/adminRouter");

//---------- the port
const port = process.env.PORT || 3000;
//---------paths
const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/view");
const partialsPath = path.join(__dirname, "../templates/partials");
//-----start the app
const app = express();
//--------app use
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
app.use(express.json());

//-----------routers
app.use("/", userRouter);
app.use("/", imageRouter);
app.use("/", adminRouter);
//main page
app.get("/", (req, res) => {
  res.render("index");
});
//register page
app.get("/register", (req, res) => {
  res.render("register");
});
//login page
app.get("/login", (req, res) => {
  res.render("login");
});

//------listen to port
app.listen(port, () => console.log("listening on port " + port));
