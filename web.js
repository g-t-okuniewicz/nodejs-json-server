const http = require("http");
const filePath = 'sensorlog.txt';
const csvtojson = require("csvtojson");

function handle_incoming_request(req, res) {
    console.log("INCOMING REQUEST: " + req.method + " " + req.url);

    csvtojson().fromFile(filePath).then(function(jsonObj) {
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify(jsonObj));
    });
}

var s = http.createServer(handle_incoming_request);

s.listen(8080);
