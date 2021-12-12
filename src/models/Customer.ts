import { Document, ObjectId } from "mongodb";

export default interface Customer extends Document {
	_id: ObjectId | undefined;
	name: string;
	address: string;
}
