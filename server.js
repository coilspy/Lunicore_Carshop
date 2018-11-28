const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
var fs = require('fs');
let database = readJSONAsyncFromFile();
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    switch(req.url){
        case '/GET/employees':
        console.log("Recieved GET/employees request.");
        
        res.write("<list of employees>");
        res.end();
        break;

        case '/GET/carmodels':
        console.log("Recieved GET/carmodels request.");
        res.write("<list of carmodels>");
        res.end();
        break;

        case '/GET/totalsales':
        console.log("Recieved GET/totalsales request.");
        
        res.write("<list of totalsales>");
        res.end();
        
        break;
        case '/POST/carmodels':
        console.log("Recieved POST/carmodels request.");

        break;

        default:
        res.writeHead(404);
        res.write("Error parsing request");
        res.end();
        break;

    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


function readJSONAsyncFromFile(filepath = "./data.json"){
    fs.readFile(filepath, 'utf8', function(err,data) {
        if(err) throw err;
        console.log("File read");
        return JSON.parse(data);
    })
}