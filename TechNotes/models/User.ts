import mongoose, { Model, Schema, model, ObjectId } from "mongoose"
import MongoFactory from "./MongoFactory"

export enum Roles {
	employee = "Employee",
	admin = "Admin"
}

export interface User {
	id?: string
	username: string
	password: string
	roles?: Roles[]
	active?: boolean
}
export interface UserDocument extends User, Document {}
export interface UserModel extends Model<UserDocument> {}
export class UserFactory extends MongoFactory {
	userSchema: Schema<UserDocument, UserModel>
	userModel: UserModel
	constructor() {
		super()
		this.userSchema = this.createSchema()
		this.userModel = this.createModel()
	}
	createSchema(): Schema<UserDocument, UserModel> {
		return new Schema<UserDocument, UserModel>({
			username: {
				type: String,
				required: [true, "User must have a name"]
			},
			password: {
				type: String,
				required: [true, "User must have a password"]
			},
			roles: {
				type: [String],
				default: [Roles.employee]
			},
			active: {
				type: Boolean,
				default: true
			}
		})
	}

	createModel(): UserModel {
		const userSchema = this.userSchema
		return model<UserDocument, UserModel>("User", userSchema)
	}
}
