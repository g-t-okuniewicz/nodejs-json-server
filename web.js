const http = require("http");
const filePath = 'sensorlog.txt';
const csvtojson = require("csvtojson");

function handle_incoming_request(req, res) {
    console.log("INCOMING REQUEST: " + req.method + " " + req.url);

    csvtojson().on('header', function(header) {
        console.log("Header: " + header);
    })

    csvtojson().on('error', function(err) {
        console.log("There was an error: " + err);
    });

    csvtojson().on('done', function(error) {
        console.log("Done with error: " + error);
    })

    csvtojson().fromFile(filePath).then(function(jsonObj) {
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify(jsonObj));
    });
}

var s = http.createServer(handle_incoming_request);

s.listen(8080);