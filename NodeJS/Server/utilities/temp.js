
const http = require('http');
const { parse: parseQuery } = require('querystring');
const formidable = require('formidable');
const urls = require("url");

class Router {
    constructor() {
        this.getRoutes = {};
        this.postRoutes = {};
        this.putRoutes = {};
        this.patchRoutes = {};
        this.deleteRoutes = {};
    }

    _addRoute(routeMap, url, ...handlers) {
        routeMap[url] = [...handlers];
    }

    _get(url, ...handlers) {
        this._addRoute(this.getRoutes, url, ...handlers);
    }

    _post(url, ...handlers) {
        this._addRoute(this.postRoutes, url, ...handlers);
    }

    _put(url, ...handlers) {
        this._addRoute(this.putRoutes, url, ...handlers);
    }

    _patch(url, ...handlers) {
        this._addRoute(this.patchRoutes, url, ...handlers);
    }

    _delete(url, ...handlers) {
        this._addRoute(this.deleteRoutes, url, ...handlers);
    }

    async handle(req, res) {
        let { method, url } = req;

       const parseurl = urls.parse(req.url , true);
       req.queryParams = parseurl.query;
       console.log(req.query);
       console.log("parseUrl",parseurl)

        url = parseurl.pathname;

        // const setParams = (method)=>{
        //     console.log(method)
        //    console.log(Object.keys[this.[`${method.toLowerCase()}Routes`]])
        //    console.log(url)
        //    console.log(urls.parse(url));
           
        // }
        // setParams(method);

        let allUrl = Object.keys(this.getRoutes);
      
     
        


        
        try {
            if (['POST', 'PUT', 'PATCH'].includes(method)) {
                const contentType = req.headers['content-type'];
                if (contentType.includes('multipart/form-data')) {
                    console.log("this multipart data");
                    const form = new formidable.IncomingForm();
                    await new Promise((resolve, reject) => {
                        form.parse(req, (err, fields, files) => {
                            if (err) reject(err);
                            req.body = fields;
                            req.files = files;
                            resolve();
                        });
                    });
                } else {
                    const body = await this.readBody(req);
                    if (contentType === 'application/json') {
                        req.body = JSON.parse(body);
                    } else if (contentType === 'application/x-www-form-urlencoded') {
                        req.body = parseQuery(body);
                    } else {
                        req.body = body;
                    }
                }
            }
        } catch (error) {
            res.writeHead(400);
            res.end("Error parsing request body");
            return;
        }
        
        
        
        let routeHandlers;
    
        
        console.log("inner",url)
        let myFun = (url)=>{
            switch (method) {
                case 'GET':
                    routeHandlers = this.getRoutes[url];
                    break;
                case 'POST':
                    routeHandlers = this.postRoutes[url];
                    break;
                case 'PUT':
                    routeHandlers = this.putRoutes[url];
                    break;
                case 'PATCH':
                    routeHandlers = this.patchRoutes[url];
                    break;
                case 'DELETE':
                    routeHandlers = this.deleteRoutes[url];
                    break;
                default:
                    res.writeHead(405);
                    res.end('Method Not Allowed');
                    return;
            }

        }

            
        if(allUrl.includes(url)){
            myFun(url);
       }else{
       let param = function matchParam(allUrls, url) {
            for (let pattern of allUrls) {
                const paramNames = [];
                const regex = convertPathToRegex(pattern, paramNames);
                const match = url.match(regex);
        
                if (match) {
                    return extractParams(match, paramNames);
                }
            }
            return null; // Return null if no pattern matches
        }
        console.log("this is ")
        
        function convertPathToRegex(path, paramNames) {
            return new RegExp("^" + path.replace(/:\w+/g, (param) => {
                paramNames.push(param.slice(1)); // Slice off the ':' and save the parameter name
                return "([^\\/]+)"; // Match one or more characters that are not a '/'
            }) + "$");
        }
        
        function extractParams(match, paramNames) {
            const params = {};
            paramNames.forEach((name, index) => {
                params[name] = match[index + 1]; // Matched groups start from index 1
            });
            return params;
        }
        
       }
    

    
        if (!routeHandlers) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }

        // Execute all handlers in sequence
        const runHandlers = (index) => {
            if (index < routeHandlers.length) {
                routeHandlers[index](req, res, () => runHandlers(index + 1));
            }
        };

        runHandlers(0);
    }

    readBody(req) {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => resolve(body));
            req.on('error', err => reject(err));
        });
    }
}

module.exports = Router;