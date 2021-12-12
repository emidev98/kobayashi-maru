import { ListSinceBlock } from "../models/ListSinceBlock";
import Transaction from "../models/Transaction";
import BitcoinService from "../services/blockchain/BitcoinService";
import TransactionsRepository from "../repository/TransactionsRepository";
import _ from "lodash";


export default class BlockchainsController {
    
    bitcoinService = new BitcoinService();
    _transactionsRepository = new TransactionsRepository();
    MIN_CONFIRMATIONS = 6;

    getTransactionsFromRepository = this._transactionsRepository.getTransactionsById;
    getSmallestTransactionFromRepository = this._transactionsRepository.getSmallestTransactionFromRepository;
    getLargestTransactionFromRepository = this._transactionsRepository.getLargestTransactionFromRepository;

    /*  Hardcoded blockHashes can be replaced with values send
        from RPC, DB, service, frontend..*/
    async getTransactionsFromChain() : Promise<Array<Transaction>> {
        const listSinceBlock = await this.bitcoinService.listSinceBlock(
            "101ed8511d55cada290fed7088e58ef62d9dc870f3a6386a5d118550626ba6f2",
            "f40bdab26258ff30055f90214a24fc6dcea57462535077f3c5789406e0e30072"
        );

        return this.parseTransactionsList(listSinceBlock);
    }
    
    /* When txsids already exists on DB, this function update 
    relevant data like nº of confirmations instead of duplicate unnecessary entries*/
    async storeTransactions(transactions : Array<Transaction>) {
        const transactionsId = _.map(transactions, transaction => transaction.txid);
        let transactionsToInsert = transactions;
        let transactionsToUpdate = await this._transactionsRepository.getTransactionsById(transactionsId);
        
        if(!_.isEmpty(transactionsToUpdate)){

            // differenceWith = returns a new array with first argument when the comparator validates true 
            // (tx received from blockchain has more confirmations than the one we have stored on DB)
            transactionsToUpdate = _.differenceWith(transactions, transactionsToUpdate, (transaction, transactionToUpdate) => {
                return transaction.confirmations >= transactionToUpdate.confirmations
                    && transaction.txid === transactionToUpdate.txid;
            });

            // Try to update transactions on parallel by id. If its updated return undefined otherwise return the TX
            const transactionsAfterUpdate = await Promise.all(_.map(transactionsToUpdate, async (transaction) => {
                const updateResult = await this._transactionsRepository.updateTransaction(transaction);

                if(updateResult.modifiedCount > 0) return undefined;
                else return transaction;
            }));

            transactionsToInsert = _.filter(transactionsAfterUpdate,(tx)=> !_.isUndefined(tx)) as Array<Transaction>;
        }
        
        // Insert the transactions that were never stored on DB
        if(!_.isEmpty(transactionsToInsert)) {
            await this._transactionsRepository.insertTransaction(transactionsToInsert);
        }
    }

    /*  chain = wrap parameter to allow functional programming with Lodash
        map = extract transactions from Array<ListSinceBlock> to Array<Array<Transactions>>
        flatMap = extract transactions from Array<Array<Transactions>> to Array<Transactions>
        filter = exclude transactions that does not match at least MIN_CONFIRMATIONS
        orderBy = order list of valid transactions by confirmations 
        uniqBy = exclude duplicated transactions so only remain ones with highest confirmations
        orderBy = order list by timereceived, that way we can have transactions chronologically
        value = collect parsed values */
    private parseTransactionsList(listsSinceBlock: Array<ListSinceBlock>): Array<Transaction> {
        return _.chain(listsSinceBlock)
            .map(listSinceBlock => listSinceBlock.transactions)
            .flatMap()
            .filter(transaction => transaction.confirmations >= this.MIN_CONFIRMATIONS)
            .orderBy('confirmations')
            .uniqBy('txid')
            .orderBy('timereceived')
            .value();
    }
}