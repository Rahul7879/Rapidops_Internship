exports.getController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('GET request called - User ');
};

exports.postController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
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
