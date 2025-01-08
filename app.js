// App imports
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("node:path");
const pgSession = require("connect-pg-simple")(session);
const { router, indexRouter } = require("./routes/indexRouter");
const pool = require("./db/pool");

// App constants
const PORT = process.env.PORT || 8080;
const assetsPath = path.join(__dirname, "public");
const sessionStore = new pgSession({
  pool: pool,
});

// App initializations
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// App level middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.use(
  session({
    store: sessionStore,
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/", indexRouter);

// App server
app.listen(PORT, () => {
  console.log(`Server is currently listening on port ${PORT}.`);
});
