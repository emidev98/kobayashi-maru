import _ from "lodash";
import Deposit from "../../models/Deposit";
import Transaction from "../../models/Transaction";
import OutputService from "./OutputService";

/*
    Implements OutputService to simplify program output
    which is important if the scope of the application is
    to send data to different places of the infrastructure.
    It can even be used for the strategy pattern to pick the
    source with may different _providers
 */
export default class ConsoleOutputService implements OutputService {

    _provider = console;

    sendDeposits(deposits: Array<Deposit>): Promise<boolean> {
        _.forEach(deposits, deposit => {
            let depositOutput : string;
            
            if(deposit.customer) {
                depositOutput = `Deposited for ${deposit.customer.name}: count=${deposit.totalTransactions} sum=${deposit.walletBalance.toFixed(8)}`;
            }
            else {
                depositOutput = `Deposited without reference: count=${deposit.totalTransactions} sum=${deposit.walletBalance.toFixed(8)}`;
            }
            this._provider.log(depositOutput);
        });
        
        return Promise.resolve(true);
    }

    sendTransactions(smallest :Transaction, largest : Transaction): Promise<boolean> {
        const smallestDeposit = `Smallest valid deposit: ${smallest.amount.toFixed(8)}`;
        const largestDeposit = `Largest valid deposit: ${largest.amount.toFixed(8)}`;

        this._provider.log(smallestDeposit);
        this._provider.log(largestDeposit);
        
        return Promise.resolve(true);
    }
}