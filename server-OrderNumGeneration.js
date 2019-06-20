var http = require('http');
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
let error;
let user;
// oracledb.getConnection({ 

//     user: 'nodeuser', 
//     password: 'MyATPdatabase123#', 
//     connectString: 'nodeappdb_high' 
// },
 function handleRequest (request, response){
    var urlparts = request.url.split("/");
    var orgName = urlparts[1];

    if (orgName == 'favicon.ico'){
        return;
    }

    console.log("orgName : " + orgName);

    oracledb.getConnection({
        user: 'admin',
        password: 'WElcome_123#',
        connectString: 'atplab_high'
    },function (err, connection){
        if (err) {
            handleError(response, "getConnection() error", err);
            return;
        }
        if (connection){
            console.log("DBConnected");

            var bindvars = {
                orderType:  orgName,
                OrderNum : {OrderNum: null, dir : oracledb.BIND_OUT},
                //cursor:  { type: oracledb.CURSOR, dir : oracledb.BIND_OUT }
              };
              console.log(bindvars);
            connection.execute(
                "DECLARE BEGIN ZEB_ORDERNUM_GENENATION(:orderType, :OrderNum); END;",
                bindvars,
                function(err, result) {
                    if (err) {
                        console.log (err);
                        return;
                    }
                    console.log(bindvars);
                    if (result) {
                        displayResults(response, result, orgName);
                    }
                }

            );
        }
    });
    //response.end(uniqueid);
}

function handleError(response, text, err) {
    if (err) {
      text += ": " + err.message;
    }
    console.error(text);
    response.write("<p>Error: " + text + "</p>");
   response.end(text);
}

function displayResults(response, result, deptid) {
    console.log("result");
    console.log(result);
    //console.log(error);
   // response.write(result);
   response.writeHead(200, {
    'Content-Type': 'text/plain'
    });

    var output = "";
    if (result.outBinds)
    {
        output = JSON.stringify(result.outBinds);
        response.end(output);
    }else{
      response.end(JSON.stringify({"Error" : "Sequence not found"}));
    }


}

const httpPort = 3050;
http.createServer(function(request, response) {
    handleRequest (request, response);
}).listen(httpPort);
console.log("Server running at http://localhost:" + httpPort);