import { readFileSync } from "fs";
import path from "path";
import { ListSinceBlock } from "../../models/ListSinceBlock";
import BlockchainService from "./BlockchainService";

export default class BlockchainMock implements BlockchainService {

    URL = "./../../../mocks";

    public async listSinceBlock(blockHash: string) : Promise<ListSinceBlock> {
        const fileUrl = `${this.URL}/listsinceblock/${blockHash}.json`
        const filePath = path.resolve(__dirname, fileUrl);
        const mock = readFileSync(filePath, "utf-8");
        return JSON.parse(mock);
    }
}