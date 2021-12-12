import dotenv from 'dotenv';
import * as mongoDB from "mongodb";

dotenv.config();

export default abstract class MongoDBRepository {
    client : mongoDB.MongoClient;
    db : mongoDB.Db | undefined;
    public abstract COLLECTION : string;

    constructor(){
        this.client = new mongoDB.MongoClient(process.env.DB_URL as string);
    }

    async connect() {
        await this.client.connect();  
        return this.client.db(process.env.DB_NAME);
    }
}