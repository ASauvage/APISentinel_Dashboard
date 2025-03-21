require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const routerDefault = require("./routes/default");
const routerSession = require("./routes/session");

// variables
const PORT = process.env.APP_PORT || 3000;

// [ mongoose] configurations
mongoose.connect(process.env.DB_HOST, {});

mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.once("open", () => console.log("Connected to the database"));

// [express] configurations
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// [express] routes definitions
app.use("/", routerDefault);
app.use("/session", routerSession);

app.get("*", (req, res) =>
    res.status(404).render("error", {
        status_code: 404,
        error: `Page ${req.url} not found`,
    })
);

app.listen(PORT, () => console.log(`Server is running on http://127.0.0.1:${PORT}`));
