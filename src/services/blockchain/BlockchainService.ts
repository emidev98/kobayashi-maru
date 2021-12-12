import { ListSinceBlock } from "../../models/ListSinceBlock";

export default interface BlockchainService {
	URL: string;
	listSinceBlock(blockHash: string): Promise<ListSinceBlock>;
}
