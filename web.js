const http = require('http');
//const information_p = document.querySelector(".requested_data");


function sendRequest(requestType, requestURL, requestData = ""){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            alert(this.responseText);
        }
    }
    xhttp.open(requestType, "127.0.0.1", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(requestData);
    console.log("request sent!");
    var response = xhttp.response;
    console.log(response);
}

