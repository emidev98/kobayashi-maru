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

    delete = async () => {
        return (await this.connect())
            .collection(this.COLLECTION)
            .deleteMany({});
    }
}