const urls = require("url");
const { handleFormData, runHandlers, getParams } = require('./rest-services.js');

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
        const parsedUrl = urls.parse(req.url, true);
        req.queryParams = parsedUrl.query;
        url = parsedUrl.pathname;
        let allUrls = Object.keys(this[`${method.toLowerCase()}Routes`]);

        await handleFormData(req, res, method);
        
        let routeHandlers;
        
        const routeHandling = (url) => {
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
        };

        if (allUrls.includes(url)) {
            routeHandling(url);
        } else {
            url = getParams(req, allUrls, url);
            routeHandling(url);
        }

        if (!routeHandlers) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
        // Execute all handlers in sequence
        runHandlers(routeHandlers, req, res);
    }
}

module.exports = Router;
