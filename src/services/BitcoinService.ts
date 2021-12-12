import { ListSinceBlock } from "../models/ListSinceBlock";
import BlockchainMock from "./BlockchainServiceMock";

export default class BitcoinService {

    blockchainService = new BlockchainMock();

    public listSinceBlock(...blocksHash: Array<string>): Promise<ListSinceBlock[]> {
        const promises = blocksHash.map(blockHash => this.blockchainService.listSinceBlock(blockHash));
        return Promise.all(promises);
    }
}