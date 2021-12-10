//create http module
const http = require('http');
const hostname = '127.0.0.1';
const port = 3030;

// create HTTP server and listen on port 3030
const server = http.createServer((req,res)=>{

    //Set the response HTTP Headers with HTTP Status and Content Type
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json')
    res.end('Entering Grup Gorman World!!');

})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
})