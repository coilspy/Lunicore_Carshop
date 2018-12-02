const domainName = "http://127.0.0.1"
const port = 3000;
const jsonData_p = document.getElementById("jsonData");
const carmodelID_input = document.getElementById("carmodel_id");
const carmodelBrand_input = document.getElementById("carmodel_brand");
const carmodelModel_input = document.getElementById("carmodel_model");
const carmodelPrice_input = document.getElementById("carmodel_price");

const httpGETRequest = async (endpoint) => {
    const response = await fetch(domainName + ":" + port + "/" + endpoint);
    await response.text().then(function (text) {
        jsonData_p.innerHTML = text;
    });
}

const httpPOSTRequest = async (endpoint, idOfForm) => {
    console.log("httpPOSTRequest for endpoint " + endpoint + " sent");
    var bodyContent = "{";
    var formObject = document.getElementById(idOfForm);
    var i;
    for(i = 0; i < formObject.length;i++){
        bodyContent += formObject.elements[i].name + ":" + formObject.elements[i].value;
        if (i < formObject.length - 1) {
            bodyContent += ",";
        }
        }
           
    bodyContent += "}";
    console.log(bodyContent);
    const request = new Request(domainName + ":" + port + "/" + endpoint, { method: 'POST', body: bodyContent, headers: { 'Content-type': 'application/json' } });
    fetch(request).then(response => {
        if (response.status === 200) {
            jsonData_p.innerHTML = response.json();
        }
        else {
            jsonData_p.innerHTML = "Invalid data or ID already exists.";
            throw new Error("Invalid post request or ID already exists.")
        }
    }).then(response => {
        console.debug(response);
    }).catch(error => {
        console.error(error);
    });
}