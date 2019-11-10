

import * as fs from "fs";

import { MemberBank } from '../models/MemberBank';
import { contractAddress, Web3Wrapper, DbsCoinWrapper, ITransactionOption, IMembers } from 'dbs-coin';

export class DbsService {
    private dbsCoinWrapper: DbsCoinWrapper = null;
    private web3Wrapper: Web3Wrapper = null;
    private dbsPubKey: string = "";
    private dbsPrivateKey: string = "";


    constructor(
    ) {

        const infura = JSON.parse(fs.readFileSync('./src/keys/infura.json', "utf8"))
        const privateKeyFile = JSON.parse(fs.readFileSync('./src/keys/privateKey.json', 'utf8'))
        this.dbsPrivateKey = privateKeyFile.DBS.privateKey;
        this.dbsPubKey = privateKeyFile.DBS.publicKey;
        const provider = "https://kovan.infura.io/v3/" + infura.token;
        this.web3Wrapper = new Web3Wrapper(provider, this.dbsPrivateKey);
        const smartcontractAddress = contractAddress.kovan.DBS.address;
        this.dbsCoinWrapper = new DbsCoinWrapper(this.web3Wrapper, smartcontractAddress);

    }

    public async transfer(
        fromBankBlockchainAddress: string,
        toBankBlockchainAddress: string,
        fromBankCustomerId: string,
        toBankCustomerId: string,
        amount: number,
        option: ITransactionOption = { gasLimit: 2000000 }
    ): Promise<string> {

        return this.dbsCoinWrapper.transfer(
            fromBankBlockchainAddress,
            toBankBlockchainAddress,
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

}
