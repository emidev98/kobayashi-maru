import _ from "lodash";
import { WithId } from "mongodb";
import Customer from "../models/Customer";
import Deposit from "../models/Deposit";
import CustomersRepository from "../repository/CustomersRepository";
import TransactionsRepository from "../repository/TransactionsRepository";

export default class CustomerService {
	customersRepository = new CustomersRepository();
	transactionsService = new TransactionsRepository();

	/*
        Extract all customers from DB. Based on these customers
        extract all transactions associated to they wallet (on parallel).
        
        Extract he remaining transactions that has no identifiable customer
        on DB.

        Finally join the Deposit object and return it.
    */
	async getCustomersDeposits(): Promise<Array<Deposit>> {
		const customers = await this.customersRepository.getCustomers();
		const depositsForKnownCustomers = await this.getDepositsForKnownCustomers(customers);
		const depositForUnknownCustomers = await this.getDepositsForUnknownCustomers(customers);

		const deposits = depositsForKnownCustomers;
		deposits.push(depositForUnknownCustomers);

		return deposits;
	}

	private async getDepositsForKnownCustomers(customers: WithId<Customer[]>) {
		const deposits = new Array<Deposit>();

		const transactionsGroupedByCustomer = await Promise.all(
			_.map(customers, async (customer) => {
				return await this.transactionsService.getTransactionsByAddress(customer.address);
			})
		);

		_.forEach(transactionsGroupedByCustomer, (transactions) => {
			const deposit = new Deposit();

			_.forEach(transactions, (transaction) => {
				deposit.walletBalanceFromTransaction(transaction);
			});

			deposit.customer = _.find(customers, (customer) => transactions[0].address === customer.address);

			deposits.push(deposit);
		});

		return deposits;
	}

	private async getDepositsForUnknownCustomers(customers: WithId<Customer[]>) {
		const knownCustomersAddresses = _.map(customers, "address");
		const transactions = await this.transactionsService.getTransactionsExcludingByAddress(knownCustomersAddresses);
		const deposit = new Deposit();

		_.forEach(transactions, (transaction) => {
			if (transaction.category === "receive") deposit.walletBalanceFromTransaction(transaction);
		});

		return deposit;
	}
}
