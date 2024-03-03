import mongoose, { Model, Schema, model, ObjectId } from "mongoose"
import MongoFactory from "./MongoFactory"

export interface Note {
	user: Schema.Types.ObjectId
	title: string
	text: string
	completed: boolean
}

export interface NoteDocument extends Note, Document {}
export interface NoteModel extends Model<NoteDocument> {}
export class NotesFactory extends MongoFactory {
	createSchema(): Schema {
		return new Schema(
			{
				user: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: "User",
				},
				title: {
					type: String,
					required: true,
				},
				text: {
					type: String,
					required: true,
				},
				completed: {
					type: Boolean,
					default: false,
				},
			},
			{
				timestamps: true,
			}
		)
	}

	createModel(): NoteModel {
		const noteSchema = this.createSchema()
		const AutoIncrement = require("mongoose-sequence")(mongoose)
		noteSchema.plugin(AutoIncrement, {
			inc_field: "ticket",
			id: "ticketNums",
			start_seq: 500,
		})
		return model<NoteDocument, NoteModel>("Note", noteSchema)
	}
}
