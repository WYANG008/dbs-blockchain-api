"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DbsService_1 = require("../service/DbsService");
const Heroes = require('../data');
class DbsRouter {
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.dbsService = new DbsService_1.DbsService();
        this.init();
    }
    /**
     * GET one hero by id
     */
    getOne(req, res, next) {
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
    commonResult(output, res) {
        if (output) {
            // res.h
            res.status(200)
                .header("Access-Control-Allow-Origin", "*")
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
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.commonResult((yield this.dbsService.getAllMemberBanks()), res);
        }));
        this.router.get('/getTxHash/:txHash', (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.commonResult((yield this.dbsService.getTransaction(req.params.txHash)), res);
        }));
        this.router.get('/getBalance/:address', (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.commonResult((yield this.dbsService.getBalance(req.params.address)), res);
        }));
        this.router.post('/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var address = req.body.address;
            var name = req.body.name;
            // res.send();
            this.commonResult((yield this.dbsService.registerMember(address, name)), res);
        }));
        this.router.post('/deRegister', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var address = req.body.address;
            var name = req.body.name;
            // res.send(await this.dbsService.deRegisterMember(address, name));
            this.commonResult((yield this.dbsService.deRegisterMember(address, name)), res);
        }));
        this.router.post('/mint', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var address = req.body.address;
            var amount = req.body.amount;
            // res.send(await this.dbsService.mintNewCoin(address, amount));
            this.commonResult((yield this.dbsService.mintNewCoin(address, amount)), res);
        }));
        this.router.post('/burn', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var address = req.body.address;
            var amount = req.body.amount;
            // res.send(await this.dbsService.burnCoin(address, amount));
            this.commonResult((yield this.dbsService.burnCoin(address, amount)), res);
        }));
        this.router.post('/transfer', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var fromBankAddr = req.body.fromBankAddr;
            var fromBankPrivKey = req.body.fromBankPrivKey;
            var toBankAddr = req.body.toBankAddr;
            var fromCusId = req.body.fromBankCustomerId;
            var toCusId = req.body.toBankCustomerId;
            var amount = req.body.amount;
            console.log(fromBankAddr, toBankAddr, fromCusId, toCusId, amount);
            // res.send(await this.dbsService.transfer(fromBankAddr, toBankAddr, fromCusId, toCusId, amount));
            this.commonResult((yield this.dbsService.transfer(fromBankAddr, fromBankPrivKey, toBankAddr, fromCusId, toCusId, amount)), res);
        }));
    }
}
exports.DbsRouter = DbsRouter;
// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new DbsRouter();
heroRoutes.init();
exports.default = heroRoutes.router;
