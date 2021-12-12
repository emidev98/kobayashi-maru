import Transaction from "./Transaction";

export interface ListSinceBlock {
    transactions : Array<Transaction>;
    removed: Array<any>;
    lastBlock: string;
}