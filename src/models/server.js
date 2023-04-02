const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = 3001;

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/', require('../routes/webapp'));
        this.app.use('/api/contracts/', require('../routes/contracts'));
        this.app.use('/api/jobs/', require('../routes/jobs'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application running on port: ${this.port}`);
        });
    }
}
module.exports = Server;