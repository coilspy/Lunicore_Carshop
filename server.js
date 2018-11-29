const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
var fs = require('fs');
var database;
fs.readFile("./data.json", 'utf8', function(err,data) {
    if(err) throw err;
    console.log("File read");
    database = JSON.parse(data);
});
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', "application/json; charset =utf-8");
    if(req.method == "GET" && req.url === "/employees")
    {
        console.log("Recieved GET/employees request.");
        res.write(JSON.stringify(database.carshop.employees,hideSalesAttribute));
        res.end();
    }
    else if(req.method == "GET" && req.url == "/carmodels")
    {
        console.log("Recieved GET/carmodels request.");
        res.write(JSON.stringify(database.carshop.carmodels));
        res.end();  
    }

    else if(req.method == "GET" && req.url ==='/totalsales')
    {
        database.carshop.employees.forEach(employee => {
            employee.sales = getEmployeeSales(employee.id);
        });
        
        console.log("Recieved GET/totalsales request.");
        res.write(JSON.stringify(database.carshop.employees));
        res.end();
    }
    else if(req.method == "POST" && req.url === "/carmodels"){
        var body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let newCar = JSON.parse(body);
            database.carshop.carmodels.push(newCar);
            res.end("you just sent a POST request, i recieved: " + body);
            updateJSONFile('./data.json');
            console.log("Recieved POST/carmodels request");
        })
    }
    else {
        res.writeHead(404);
        res.write("Error 404 - page not found");
        res.end();
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


function getEmployeeSales(employee_id)
{
    let salevalue = 0;
    database.carshop.sales.forEach( sale => {
        if(sale.employee_id === employee_id){
            salevalue += getPriceOfVehicle(sale.carmodel_id);
        }
    });
    return salevalue;
}

function getPriceOfVehicle(car_id){
    let price = 0;
    database.carshop.carmodels.forEach(car => {
        if(car.id === car_id){
            price = car.price;
        }        
    });
    return price;
}   

function hideSalesAttribute(key, value)
{
    if(key === "sales") return undefined;
    else return value;
}

function updateJSONFile(filepath = './dataNew.json'){
    fs.writeFile(filepath, JSON.stringify(database));
}
