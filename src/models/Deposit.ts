import Customer from "./Customer";
import Transaction from "./Transaction";

export default class Deposit {
	private _customer: Customer | undefined;
	private _walletBalance = 0;
	private _totalTransactions = 0;

	public get customer(): Customer | undefined {
		return this._customer;
	}

	public set customer(value: Customer | undefined) {
		this._customer = value;
	}

	public get walletBalance(): number {
		return this._walletBalance;
	}

	/* As of the "blockhash" documentation:
        "category":"send|receive",  
			(string) The transaction category. 'send' has negative amounts, 'receive' has positive amounts.
        "amount": x.xxx,            
			(numeric) The amount in BTC. This is negative for the 'send' category, and for the 'move' category for
				moves outbound. It is positive for the 'receive' category, and for the 'move' category for inbound funds
    */
	public walletBalanceFromTransaction(transaction: Transaction) {
		this._walletBalance = this._walletBalance + transaction.amount;
		this._totalTransactions++;
	}

	public get totalTransactions(): number {
		return this._totalTransactions;
	}
}
