import dotenv from 'dotenv';
import _ from 'lodash';
import BlockchainsController from './controllers/BlockchainController';
import ConsoleOutputService from './services/output/ConsoleOutputService';
import CustomerService from './services/CustomerService';

dotenv.config();

(async () => {
    const blockchainController = new BlockchainsController();
    const customerService = new CustomerService();
    const consoleOutputService = new ConsoleOutputService();
    
    // 1.Read all transactions from JSON file...
    const transactions = await blockchainController.getTransactionsFromChain();
    //...  (1.1) store all deposits in a database of your choice.
    await blockchainController.storeTransactions(transactions);
    
    // 2.Read deposits from the database that are good to credit to users
    const deposits = await customerService.getCustomersDeposits();
    //... (2.1) Smallest valid deposit
    const smallestDeposit = await blockchainController.getSmallestTransactionFromRepository();
    //... (2.2) Largest valid deposit
    const largestDeposit = await blockchainController.getLargestTransactionFromRepository();
    
    // 3. Print ...
    //... (3.1) deposits
    consoleOutputService.sendDeposits(deposits);
    //... (3.2) smallest / biggest deposit
    consoleOutputService.sendTransactions(smallestDeposit,largestDeposit);
})();