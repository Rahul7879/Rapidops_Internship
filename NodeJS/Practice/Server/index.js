const http = require("http");

http.createServer((req,res)=>{
    let body = "";
    console.log(req.body);

    req.on("data",(chunk)=>{
        body+=chunk;
        console.log("chunk receinved")
    })

    req.on('end', () => {
        // body = Buffer.concat(body).toString();
        console.log('Body:', body);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Request received and processed');
      });
    
      req.on('error', (err) => {
        console.error('Request Error:', err);
        res.statusCode = 400;
        res.end('Error processing request');
      });
    
      req.on('aborted', () => {
        console.error('Request aborted by the client');
      });
    
      req.on('close', () => {
        console.log('Connection closed before request completed');
      });


    console.log(req.method);
   if(req.url === "/" && req.method == "GET"){
    res.end("home")
   }
   console.log(req.body);
}).listen(3000,(req,res)=>{
    console.log("listening")
})

