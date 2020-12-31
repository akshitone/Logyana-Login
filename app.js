const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoSessionStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const MONGODB_URL =
  "mongodb+srv://akshitone-logyana:jEqm85U637ppkXV@nodejs.o6nqs.mongodb.net/logyana";

const app = express();

const storeSession = new MongoSessionStore({
  uri: MONGODB_URL,
  collection: "sessions",
});

app.set("view engine", "ejs");

const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: storeSession,
  })
);

app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
