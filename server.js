const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/dist/voyager"));

app.listen(port, () => {
    console.log("Server is listening on port : " + port);
});

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/dist/voyager/index.html");
});