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

//timestamp endpoint(s)

app.get("/api/timestamp/", (req, res) => {
    res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_string?", function(req, res) {
    let result = {
        unix: null,
        utc: null
    };
    try {
        let currentDate = null;

        if (/\d{5}/g.test(req.params.date_string)) {
            currentDate = new Date(parseInt(req.params.date_string));
        } else if (moment(req.params.date_string, moment.ISO_8601).isValid()) {
            currentDate = new Date(req.params.date_string);
        } else {
            throw new Error("Invalid Date");
        }

        result.unix = currentDate.valueOf();
        result.utc = currentDate.toUTCString();
        res.json(result);
    } catch (error) {
        res.json({ error: "Invalid Date" });
    }
});

const PORT = 3000 || process.env.PORT;

// listen for requests :)
var listener = app.listen(PORT, function() {
    console.log("Your app is listening on port " + listener.address().port);
});
