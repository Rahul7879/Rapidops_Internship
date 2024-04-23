class Router {
    constructor() {
        this.routes = [];
    }
    // Accept multiple handlers (middlewares + final handler)
    add(method, url, ...handlers) {
        // console.log(this.routes)
        this.routes.push({ method, url, handlers });
    }

    handle(req, res) {
        const { method, url } = req;
        console.log(this.routes);
        const route = this.routes.find(r => r.method === method && r.url === url);

        if (!route) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }

        // Execute all handlers in sequence (middleware + final handler)
        const runHandlers = (index) => {
            if (index < route.handlers.length) {
                route.handlers[index](req, res, () => runHandlers(index + 1));
            }
        };

        runHandlers(0);
    }
}


module.exports = Router;
