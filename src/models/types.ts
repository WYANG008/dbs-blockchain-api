export interface Tx {
    status: boolean;
    blockHash: string;
    blockNumber: number;
    transactionHash: string;
    transactionIndex: number;
    from: string;
    to: string;
    contractAddress: string | null;
    cumulativeGasUsed: number;
    gasUsed: number;
    logs: Array<{
        data: string;
        topics: string[];
        logIndex: number;
        transactionIndex: number;
        transactionHash: string;
        blockHash: string;
        blockNumber: number;
        address: string;
    }>
};
