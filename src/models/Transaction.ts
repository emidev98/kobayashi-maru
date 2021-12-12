import { Document, ObjectId } from "mongodb";

export default interface Transaction extends Document {
	_id: ObjectId | undefined;
	involvesWatchonly: boolean;
	account: string;
	address: string;
	category: string;
	amount: number;
	label: string;
	confirmations: number;
	blockhash: string;
	blockindex: number;
	blocktime: number;
	txid: string;
	vout: number;
	walletconflicts: Array<string>;
	time: number;
	timereceived: number;
	"bip125-replaceable": string;
}
