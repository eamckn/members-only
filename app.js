// App imports
require("dotenv").config();
const express = require("express");
const path = require("node:path");
const { router, indexRouter } = require("./routes/indexRouter");

// App constants
const PORT = process.env.PORT || 8080;
const assetsPath = path.join(__dirname, "public");

// App initializations
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// App level middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use("/", indexRouter);

// App server
app.listen(PORT, () => {
  console.log(`Server is currently listening on port ${PORT}.`);
});
