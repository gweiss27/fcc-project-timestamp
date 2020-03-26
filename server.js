// server.js
// where your node app starts

// init project
var express = require("express");
const moment = require("moment");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
    res.json({ greeting: "hello API" });
});

//timestamp endpoint
app.get("/api/timestamp/:date_string?", function(req, res) {
    let result = {
        unix: null,
        utc: null
    };
    try {
        if (req.params.date_string === undefined) {
            let currentDate = moment();
            result.unix = currentDate.unix();
            result.utc = currentDate.toISOString();
        } else {
            result.unix = moment(req.params.date_string).unix();
            result.utc = moment(req.params.date_string, "YYYY-MM-DD").format(
                "MMMM Do YYYY, h:mm:ss a"
            );
        }
        res.json(result);
    } catch (error) {
        result.utc = "Invalid Date";
        res.json(result);
    }
});

const PORT = 3000 || process.env.PORT;

// listen for requests :)
var listener = app.listen(PORT, function() {
    console.log("Your app is listening on port " + listener.address().port);
});
