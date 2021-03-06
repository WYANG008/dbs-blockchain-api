import { Router, Request, Response, NextFunction } from 'express';
import { DbsService } from '../service/DbsService';
const Heroes = require('../data');

export class DbsRouter {
  router: Router
  dbsService: DbsService;

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.dbsService = new DbsService();
    this.init();
  }


  /**
   * GET one hero by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let query = parseInt(req.params.id);
    console.log(query);
    let hero = Heroes.find(hero => hero.id === query);
    if (hero) {
      res.status(200)
        .send({
          message: 'Success',
          status: res.status,
          hero
        });
    }
    else {
      res.status(404)
        .send({
          message: 'No hero found with the given id.',
          status: res.status
        });
    }
  }

  public commonResult(output: any, res: Response) {
    if (output) {
      // res.h
      res.status(200)
        .send({
          message: 'Success',
          status: res.status,
          result: output
        });
    }
    else {
      res.status(404)
        .send({
          message: 'no result',
          status: res.status
        });
    }

  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', async (req, res) => {
      let output = null;
      try {
        output = await this.dbsService.getAllMemberBanks()
        this.commonResult(output, res)
      }catch(err){
        res.status(404)
        .send({
          message: JSON.stringify(err),
          status: res.status
        });
      }
     
    });
    this.router.get('/getTxHash/:txHash', async (req, res) => {
      // this.commonResult(, res);

      let output = null;
      try {
        output = (await this.dbsService.getTransaction(req.params.txHash))
        this.commonResult(output, res)
      }catch(err){
        res.status(404)
        .send({
          message: JSON.stringify(err),
          status: res.status
        });
      }
    });
    this.router.get('/getBalance/:address', async (req, res) => {
      // this.commonResult(, res)

      let output = null;
      try {
        output = (await this.dbsService.getBalance(req.params.address))
        this.commonResult(output, res)
      }catch(err){
        res.status(404)
        .send({
          message: JSON.stringify(err),
          status: res.status
        });
      }
    });
    this.router.post('/register', async (req, res) => {
      var address = req.body.address;
      var name = req.body.name;
      // res.send();
      // this.commonResult(, res)

      let output = null;
      try {
        output = (await this.dbsService.registerMember(address, name))
        this.commonResult(output, res)
      }catch(err){
        res.status(404)
        .send({
          message: JSON.stringify(err),
          status: res.status
        });
      }
    });
    this.router.post('/deRegister', async (req, res) => {
      var address = req.body.address;
      var name = req.body.name;
      // res.send(await this.dbsService.deRegisterMember(address, name));
      // this.commonResult(, res)

      let output = null;
      try {
        output = (await this.dbsService.deRegisterMember(address, name))
        this.commonResult(output, res)
      }catch(err){
        res.status(404)
        .send({
          message: JSON.stringify(err),
          status: res.status
        });
      }
    });
    this.router.post('/mint', async (req, res) => {
      var address = req.body.address;
      var amount = req.body.amount;
      // res.send(await this.dbsService.mintNewCoin(address, amount));
      // this.commonResult(, res)

      let output = null;
      try {
        output = (await this.dbsService.mintNewCoin(address, amount))
        this.commonResult(output, res)
      }catch(err){
        res.status(404)
        .send({
          message: JSON.stringify(err),
          status: res.status
        });
      }
    });
    this.router.post('/burn', async (req, res) => {
      var address = req.body.address;
      var amount = req.body.amount;
      // res.send(await this.dbsService.burnCoin(address, amount));
      // this.commonResult(, res)

      let output = null;
      try {
        output =(await this.dbsService.burnCoin(address, amount))
        this.commonResult(output, res)
      }catch(err){
        res.status(404)
        .send({
          message: JSON.stringify(err),
          status: res.status
        });
      }
    });
    this.router.post('/transfer', async (req, res) => {
      var fromBankAddr = req.body.fromBankAddr;
      var fromBankPrivKey = req.body.fromBankPrivKey;
      var toBankAddr = req.body.toBankAddr;
      var fromCusId = req.body.fromBankCustomerId;
      var toCusId = req.body.toBankCustomerId;
      var amount = req.body.amount;
      console.log(fromBankAddr, toBankAddr, fromCusId, toCusId, amount);
      // res.send(await this.dbsService.transfer(fromBankAddr, toBankAddr, fromCusId, toCusId, amount));
      // this.commonResult((await this.dbsService.transfer(
      //   fromBankAddr,
      //   fromBankPrivKey,
      //   toBankAddr,
      //   fromCusId,
      //   toCusId,
      //   amount

      // )), res)


      let output = null;
      try {
        output =(await this.dbsService.transfer(
          fromBankAddr,
          fromBankPrivKey,
          toBankAddr,
          fromCusId,
          toCusId,
          amount
  
        ))
        this.commonResult(output, res)
      }catch(err){
        res.status(404)
        .send({
          message: JSON.stringify(err),
          status: res.status
        });
      }
    });
  }

}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new DbsRouter();
heroRoutes.init();

export default heroRoutes.router;
