import { Document, InsertManyResult, UpdateResult } from "mongodb";
import BlockchainsController from "../src/controllers/BlockchainController";

let blockchainsController: BlockchainsController;

beforeEach(() => {
	blockchainsController = new BlockchainsController();

	blockchainsController._transactionsRepository = {
		getTransactionsById: jest.fn(async () => {
			return new Array<any>();
		}),
		updateTransaction: jest.fn(async () => {
			return {} as UpdateResult;
		}),
		insertTransaction: jest.fn(async () => {
			return {} as InsertManyResult<Document>;
		})
	} as any; // Was running out of time, don't take it on consideration :)
});

describe("BlockchainsController", () => {
	it("Get transactions from blockchain filter by confirmations and order by timestamp", async () => {
		// Given = When
		const transactions = await blockchainsController.getTransactionsFromChain();

		// Then
		expect(202).toBe(transactions.length);
		expect(transactions.map((transaction) => transaction.timereceived)).toEqual(
			transactions.map((transaction) => transaction.timereceived).sort()
		);
	});

	it("Store parsed transactions on repository", async () => {
		// Given
		const transactions = await blockchainsController.getTransactionsFromChain();

		// When
		await blockchainsController.storeTransactions(transactions);

		// Then
		expect(blockchainsController._transactionsRepository.getTransactionsById).toHaveBeenCalledTimes(1);
		expect(blockchainsController._transactionsRepository.updateTransaction).toHaveBeenCalledTimes(0);
		expect(blockchainsController._transactionsRepository.insertTransaction).toHaveBeenCalledTimes(1);
	});
});
