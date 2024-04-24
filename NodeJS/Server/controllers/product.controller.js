exports.getController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('GET request called - Product');
    console.log(req.url);
};

exports.postController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('POST request called - Product');
};

exports.deleteController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('DELETE request called - Product');
};

exports.putController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('PUT request called - Product');
};

exports.patchController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('PATCH request called - Product');
};
