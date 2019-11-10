


export class Transfer {

    public fromBankBlockchainAddress: string;

    public toBankBlockchainAddress: string;

    public fromBankCustomerId: string;

    public toBankCustomerId: string;


    public amount: number;


    public toString(): string {
        return `${this.fromBankBlockchainAddress} ${this.toBankBlockchainAddress}`;
    }

}
