exports.getController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('GET request called - User ');
    console.log(req.params , "params comming")
    console.log(JSON.stringify(req.queryParams) , "queryparams comming")
};

exports.postController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    console.log(req.body , "body comming")
    console.log(req.files , "file comming")
    console.log(req.params , "params comming")
    console.log(req.queryParams , "queryparams comming")

    res.end('POST request called - User');
};

exports.deleteController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('DELETE request called - User');
};

exports.putController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('PUT request called - User');
};

exports.patchController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('PATCH request called - User');
};
