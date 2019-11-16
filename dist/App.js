"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
// import {cors} from "cors";
var cors = require('cors');
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (["3.0.57.50", "http://dbscoin-demo.nusiss.net"].indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
const DbsRouter_1 = require("./routes/DbsRouter");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH, HEAD');
            res.set('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
        this.express.use(cors({
            origin: (origin, callback) => {
                return callback(null, true);
            },
            credentials: false
        }));
        this.express.options('*', cors({
            exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
        }));
    }
    // Configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        // this.express.use('/', router);
        this.express.use('/api/dbs/', DbsRouter_1.default);
    }
}
exports.default = new App().express;
