//curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listsinceblock", "params": ["000000000000000bacf66f7497b7dc45ef753ee9a7d38571037cdb1a57f663ad", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
const env = require('dotenv').config();

export default class HttpProvider {

    private static URL = process.env.BLOCKCHAIN_URL;

    public static listSinceBlock(
        blockhash?: string,
        target_confirmations: number = 1,
        include_watchonly: boolean = false,
        include_removed: boolean = true
    ) {
        console.log(this.URL)
    }
}