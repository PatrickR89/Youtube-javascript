import mongoose from "mongoose"

export default class MongooseProvider {
	databaseUri?: string
	constructor() {
		this.databaseUri = process.env.DATABASE_URI
	}
	async connectDB() {
		if (this.databaseUri === undefined) {
			throw new Error("No URI found for database Connection!")
		}
		await mongoose.connect(this.databaseUri!)
	}
}
