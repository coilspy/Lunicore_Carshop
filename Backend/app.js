var http = require('http');
var fileSystem = require('fs');
const hostname = "127.0.0.2"
const port = 3000;

var clientCode = readContentOfFile("Frontend/client.js");
var indexDocument = readContentOfFile("Frontend/index.html");
var stylesDocument = readContentOfFile("Frontend/styles.css");

function readContentOfFile(path){
   return fileSystem.readFileSync(path , "utf8" ,function(err,data){
        if(err) throw err;
   });
}


const server = http.createServer((request, response) =>  {
    response.statusCode = 200;
    response.setHeader('Content-Type', "text/html; charset =utf-8");
    console.log(request.method + " recieved at endpoint " + request.url);
    response.setHeader('Access-Control-Allow-Origin', '*');

    if(request.method == "GET" && request.url == "/")
    {
        response.end("" + indexDocument);
        console.log("Response sent.");
    }
    else if(request.method == "GET" && request.url == "/styles.css"){
        response.writeHead(200, {'Content-type' : 'text/css'});
        response.end("" + stylesDocument);
        console.log("Response sent.");
    }
    else if(request.method == "GET" && request.url == "/client.js")
    {
        response.writeHead(200, {'Content-type' : 'application/javascript'});
        response.end("" + clientCode)
    }
    else {
        console.log(request.method);
        console.log(request.url);
        response.writeHead(404);
        statusCode = 404;
        response.end("Error 404 - page not found");
    }
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  