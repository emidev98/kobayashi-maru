import dotenv from 'dotenv';
import _ from 'lodash';
import BlockchainsController from './controllers/BlockchainController';
import CustomerController from './controllers/CustomerController';


dotenv.config();

(async () => {
    const blockchainController = new BlockchainsController();
    const customerController = new CustomerController();
    
    // Read all transactions from JSON file...
    const transactions = await blockchainController.getTransactionsFromChain();
    // ...  store all deposits in a database of your choice.
    await blockchainController.storeTransactions(transactions);

    // Read deposits from the database that are good to credit to users
    const transactionsIds = _.map(transactions, transaction => transaction.txid);
    const transactionsFromRepo = await blockchainController.getTransactionsFromRepository(transactionsIds);
    console.log(transactionsFromRepo.length)
    //
    
    
    // console.log(await customersRepository.getCustomers());
})();