import _ from "lodash";
import { WithId } from "mongodb";
import Transaction from "../models/Transaction";
import MongoDBRepository from "./MongoDBRepository";

export default class TransactionsRepository extends MongoDBRepository {
    public COLLECTION: string = "transactions";

    getTransactionsById = async (transactionsIds : Array<string>): Promise<WithId<Transaction>[]> => {
        const transactions = (await this.connect())
            .collection(this.COLLECTION)
            .find({
                txid : {
                    $in: transactionsIds
                }
            })
            .toArray();

        return transactions as Promise<WithId<Transaction>[]>;
    }

    getTransactionsByAddress = async (address : string): Promise<WithId<Transaction>[]> => {
        const transactions = (await this.connect())
            .collection(this.COLLECTION)
            .find({
                address: {
                        $eq: address
                    }
                }
            )
            .toArray();
            
        return transactions as Promise<WithId<Transaction>[]>;
    }

    getTransactionsExcludingByAddress = async (address : Array<string>): Promise<WithId<Transaction>[]> => {
        const transactions = (await this.connect())
            .collection(this.COLLECTION)
            .find({
                address: {
                        $nin: address
                    }
                }
            )
            .toArray();
            
        return transactions as Promise<WithId<Transaction>[]>;
    }

    getSmallestTransactionFromRepository = async () => {
        const collection = (await this.connect())
            .collection(this.COLLECTION);

        const transactions = await collection.find({
                category: 'receive',
                amount: {
                    $gt: 0
                }
            })
            .sort({amount: 'asc'})
            .limit(1)
            .toArray();

        return _.first(transactions) as Transaction;
    }
    
    getLargestTransactionFromRepository = async () => {
        const collection = (await this.connect())
            .collection(this.COLLECTION);

        const transactions = await collection.find({
                category: 'receive'
            })
            .sort({amount: 'desc'})
            .limit(1)
            .toArray();

        return _.first(transactions) as Transaction;
    }

    insertTransaction = async (transactions: Array<Transaction>) => {
        return (await this.connect())
            .collection(this.COLLECTION)
            .insertMany(transactions);
    }

    updateTransaction = async (transaction: Transaction) => {
        return (await this.connect())
            .collection(this.COLLECTION)
            .updateOne({
                    txid: {
                        $eq: transaction._id
                    }
                },
                {$set: transaction}
            );
    }
}