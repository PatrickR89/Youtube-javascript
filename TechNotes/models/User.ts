import mongoose, { Model, Schema, model } from "mongoose"
import MongoFactory from "./MongoFactory"

export enum Roles {
	employee = "Employee",
	admin = "Admin",
}

export interface User {
	username: string
	password: string
	roles?: Roles[]
	active?: boolean
}

export class UserFactory extends MongoFactory {
	createSchema(): Schema {
		return new Schema({
			username: {
				type: String,
				required: true,
			},
			password: {
				types: String,
				required: true,
			},
			roles: {
				type: [Roles],
				default: Roles.employee,
			},
			active: {
				type: Boolean,
				default: true,
			},
		})
	}

	createModel() {
		const userSchema = this.createSchema()
		return model("User", userSchema)
	}
}
