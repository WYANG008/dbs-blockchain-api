import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
// import {cors} from "cors";
var cors = require('cors');


import DbsRouter from './routes/DbsRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH, HEAD');
      res.set('Access-Control-Allow-Headers', 'Content-Type')
      next();
    });
    this.express.use(cors({
      origin: (origin, callback) => {
        return callback(null, true)

      },
      credentials: false
    }));
    this.express.options('*', cors({
      exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']

    }
      
    ));
  }

  // Configure API endpoints.
  private routes(): void {
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
    this.express.use('/api/dbs/', DbsRouter);
   
  }

}

export default new App().express;
