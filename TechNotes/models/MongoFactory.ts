import { Schema } from "mongoose"

export default abstract class MongoFactory {
	constructor() {
		this.createModel = this.createModel.bind(this)
	}
	public abstract createSchema(): Schema
	public abstract createModel(): any
}
