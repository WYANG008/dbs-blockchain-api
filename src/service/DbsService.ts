

import * as fs from "fs";

import { MemberBank } from '../models/MemberBank';
import { contractAddress, Web3Wrapper, DbsCoinWrapper, ITransactionOption, IMembers } from 'dbs-coin';
import {Tx} from '../models/types';

export class DbsService {
    private dbsCoinWrapper: DbsCoinWrapper = null;
    // private bankCoinWrapper: DbsCoinWrapper = null;
    private web3Wrapper: Web3Wrapper = null;
    // private bankWeb3Wrapper: Web3Wrapper = null;
    private provider : string = "";
    private dbsPubKey: string = "";
    private dbsPrivateKey: string = "";
    private smartcontractAddress: string = "";


    constructor(
    ) {

        const infura = JSON.parse(fs.readFileSync('./src/keys/infura.json', "utf8"))
        const privateKeyFile = JSON.parse(fs.readFileSync('./src/keys/privateKey.json', 'utf8'))
        this.dbsPrivateKey = privateKeyFile.DBS.privateKey;
        this.dbsPubKey = privateKeyFile.DBS.publicKey;
        this.provider = "https://kovan.infura.io/v3/" + infura.token;
        this.web3Wrapper = new Web3Wrapper(this.provider, this.dbsPrivateKey);
        this.smartcontractAddress = contractAddress.kovan.DBS.address;
        this.dbsCoinWrapper = new DbsCoinWrapper(this.web3Wrapper, this.smartcontractAddress);

    }

    public async transfer(
        fromBankPubKey: string,
        fromBankPrivKey: string,
        toBankAddress: string,
        fromBankCustomerId: string,
        toBankCustomerId: string,
        amount: number,
        option: ITransactionOption = { gasLimit: 2000000 }
    ): Promise<string> {
        console.log( 
            fromBankPubKey,
            fromBankPrivKey,
            toBankAddress,
            fromBankCustomerId,
            toBankCustomerId,
            amount
        );


        const bankWeb3Wrapper = new Web3Wrapper(this.provider, fromBankPrivKey);
        this.dbsCoinWrapper = new DbsCoinWrapper(bankWeb3Wrapper, this.smartcontractAddress);
        return this.dbsCoinWrapper.transfer(
            fromBankPubKey,
            toBankAddress,
            fromBankCustomerId,
            toBankCustomerId,
            amount,
            option);
    }

    public async mintNewCoin(
        toBankBlockchainAddress: string,
        amount: number,
        option: ITransactionOption = { gasLimit: 2000000 }
    ): Promise<string> {
        return this.dbsCoinWrapper.mintNewCoin(this.dbsPubKey, toBankBlockchainAddress, amount, option);
    }

    public async burnCoin(
        toBankBlockchainAddress: string,
        amount: number,
        option: ITransactionOption = { gasLimit: 2000000 }
    ) {
        return this.dbsCoinWrapper.burnCoin(this.dbsPubKey, toBankBlockchainAddress, amount, option);

    }

    public async registerMember(
        memberBankBlockchainAddress: string,
        bankName: string,
        option: ITransactionOption = { gasLimit: 2000000 }
    ): Promise<string> {
        return this.dbsCoinWrapper.registerMember(this.dbsPubKey, memberBankBlockchainAddress, bankName);
    }

    public async deRegisterMember(
        memberBankBlockchainAddress: string,
        bankName: string,
        option: ITransactionOption = { gasLimit: 2000000 }
    ): Promise<string> {
        return this.dbsCoinWrapper.deRegisterMember(this.dbsPubKey, memberBankBlockchainAddress, bankName);
    }

    public async getAllMemberBanks(): Promise<MemberBank[]> {
        const results: IMembers[] = await this.dbsCoinWrapper.getAllMemberBanks();
        return results.map(result => ({
            address: result.blockchainAddress,
            name: result.bankName
        }))
    }

    public async getTransaction(txHash: string): Promise<null | Tx> {
        const results: null | Tx = await this.web3Wrapper.getTransactionReceipt(txHash);
        return results;
    }

    public async getBalance(address: string): Promise<number> {
        const results = await this.web3Wrapper.getErc20Balance(this.smartcontractAddress, address);
        return results;
    }


}
