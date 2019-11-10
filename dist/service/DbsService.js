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
const fs = require("fs");
const dbs_coin_1 = require("dbs-coin");
class DbsService {
    constructor() {
        this.dbsCoinWrapper = null;
        this.web3Wrapper = null;
        this.dbsPubKey = "";
        this.dbsPrivateKey = "";
        const infura = JSON.parse(fs.readFileSync('./src/keys/infura.json', "utf8"));
        const privateKeyFile = JSON.parse(fs.readFileSync('./src/keys/privateKey.json', 'utf8'));
        this.dbsPrivateKey = privateKeyFile.DBS.privateKey;
        this.dbsPubKey = privateKeyFile.DBS.publicKey;
        const provider = "https://kovan.infura.io/v3/" + infura.token;
        this.web3Wrapper = new dbs_coin_1.Web3Wrapper(provider, this.dbsPrivateKey);
        const smartcontractAddress = dbs_coin_1.contractAddress.kovan.DBS.address;
        this.dbsCoinWrapper = new dbs_coin_1.DbsCoinWrapper(this.web3Wrapper, smartcontractAddress);
    }
    transfer(fromBankBlockchainAddress, toBankBlockchainAddress, fromBankCustomerId, toBankCustomerId, amount, option = { gasLimit: 2000000 }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dbsCoinWrapper.transfer(fromBankBlockchainAddress, toBankBlockchainAddress, fromBankCustomerId, toBankCustomerId, amount, option);
        });
    }
    mintNewCoin(toBankBlockchainAddress, amount, option = { gasLimit: 2000000 }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dbsCoinWrapper.mintNewCoin(this.dbsPubKey, toBankBlockchainAddress, amount, option);
        });
    }
    burnCoin(toBankBlockchainAddress, amount, option = { gasLimit: 2000000 }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dbsCoinWrapper.burnCoin(this.dbsPubKey, toBankBlockchainAddress, amount, option);
        });
    }
    registerMember(memberBankBlockchainAddress, bankName, option = { gasLimit: 2000000 }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dbsCoinWrapper.registerMember(this.dbsPubKey, memberBankBlockchainAddress, bankName);
        });
    }
    deRegisterMember(memberBankBlockchainAddress, bankName, option = { gasLimit: 2000000 }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dbsCoinWrapper.deRegisterMember(this.dbsPubKey, memberBankBlockchainAddress, bankName);
        });
    }
    getAllMemberBanks() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.dbsCoinWrapper.getAllMemberBanks();
            return results.map(result => ({
                address: result.blockchainAddress,
                name: result.bankName
            }));
        });
    }
}
exports.DbsService = DbsService;
