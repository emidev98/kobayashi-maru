import Deposit from "../../models/Deposit";
import Transaction from "../../models/Transaction";

export default interface OutputService {
    
    _provider: typeof console;

    sendDeposits(deposits : Array<Deposit>): Promise<boolean>;
    sendTransactions(smallest :Transaction, largest : Transaction): Promise<boolean>;
}