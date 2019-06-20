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
    var uniqueid = urlparts[1];

    if (uniqueid == 'favicon.ico'){
        return;
    }

    console.log("uniqueid : " + uniqueid);

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

            connection.execute(
                `SELECT JSON_OBJECT ('Id' is c.channel_id,
                'description' is c.CHANNEL_DESC,
                'class' is c.CHANNEL_CLASS) channel
                FROM channels c
                WHERE c.CHANNEL_ID = :id`,
                [uniqueid],
                function(err, result) {
                    if (err) {
                        console.log (err);
                        return;
                    }
                    if (result) {
                        displayResults(response, result, uniqueid);
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
    console.log(result);
    //console.log(error);
   // response.write(result);
   response.writeHead(200, {
    'Content-Type': 'text/plain'
    });

    var output = "";
    if (result.rows.length > 0)
    {
        output = result.rows[0][0];
        response.end(output);
    }else{
      response.end(JSON.stringify({"Error" : "Record not found"}));
    }


}

const httpPort = 3050;
http.createServer(function(request, response) {
    handleRequest (request, response);
}).listen(httpPort);
console.log("Server running at http://localhost:" + httpPort);