import { WithId } from "mongodb";
import { Customer } from "../models/Customer";
import MongoDBRepository from "./MongoDBRepository";

export default class CustomersRepository extends MongoDBRepository {
    public COLLECTION: string = "customers";

    getCustomers = async () : Promise<WithId<Customer>[]> => {
        const customers = (await this.connect())
            .collection(this.COLLECTION)
            .find({})
            .toArray();

        return customers as Promise<WithId<Customer>[]>;
    }
}