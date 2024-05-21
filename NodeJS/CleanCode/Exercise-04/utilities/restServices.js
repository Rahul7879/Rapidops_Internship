const http = require('http');
const { parse: parseQuery } = require('querystring');
const urls = require("url");
const formidable = require("formidable");


const handleFormData = async (req, res, method) => {
    try {
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            const contentType = req.headers['content-type'];
            if (contentType && contentType.includes('multipart/form-data')) {
                const form = new formidable.IncomingForm();
                await new Promise((resolve, reject) => {
                    form.parse(req, (err, fields, files) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        req.body = fields;
                        req.files = files;
                        resolve();
                    });
                });
            } else {
                const body = await readBody(req);
                if (contentType === 'application/json') {
                    req.body = JSON.parse(body);
                } else if (contentType === 'application/x-www-form-urlencoded') {
                    req.body = parseQuery(body);
                }
                else {
                    req.body = body;
                }
            }
        }
    } catch (error) {
        console.log("Error")
        res.writeHead(400);
        res.end("Error parsing request body");
        return;
    }
}

const runHandlers = (routeHandlers, req, res, index = 0) => {
    if (index < routeHandlers.length) {
        routeHandlers[index](req, res, () => runHandlers(routeHandlers, req, res, index + 1));
    }
};

const readBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => resolve(body));
        req.on('error', err => reject(err));
    });
}

const convertPathToRegex = (path, paramNames) => {
    return new RegExp("^" + path.replace(/:\w+/g, (param) => {
        paramNames.push(param.slice(1));
        return "([^\\/]+)";
    }) + "$");
}

const extractParams = (match, paramNames) => {
    const params = {};
    paramNames.forEach((name, index) => {
        params[name] = match[index + 1];
    });
    return params;
}

const getParams = (req, allUrl, url) => {
    for (let pattern of allUrl) {
        const paramNames = [];
        const regex = convertPathToRegex(pattern, paramNames);
        const match = url.match(regex);
        

        if (match) {
            let a = extractParams(match, paramNames);
            req.params = a;
            return pattern;
        }
    }
    return null;
}



module.exports = { handleFormData, runHandlers, readBody, getParams };