import { UserFactory, User, UserDocument, UserModel } from "../models/User"
import { NotesFactory, NoteDocument } from "../models/Notes"
import { Request, RequestHandler, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import { Query, Document } from "mongoose"
import { DeleteResult } from "mongodb"
import { resourceLimits } from "worker_threads"

export default class UserController {
	factory: UserFactory = new UserFactory()
	getAllUsers(): RequestHandler {
		return expressAsyncHandler(async (req: Request, res: Response) => {
			let UserModel = this.factory.userModel
			const user = await UserModel.find().select("-password").lean()
			if (!user) {
				res.status(400).json({ message: "No Users Found" })
				return
			}
			res.json(user)
		})
	}

	createNewUser(): RequestHandler {
		return expressAsyncHandler(async (req: Request, res: Response) => {
			let UserModel = this.factory.userModel
			const user: User | undefined = req.body
			console.log(user)
			if (!user?.username || !user?.password || !Array.isArray(user?.roles)) {
				res.status(400).json({ message: "All fields are required" })
				return
			}

			const name = user?.username
			const duplicate = await UserModel.findOne({ name }).lean().exec()

			if (duplicate) {
				res.status(409).json({ message: "User already exists" })
				return
			}
			const hashedPwd = await bcrypt.hash(user!.password, 10)
			const userObject: User = {
				username: user.username,
				password: hashedPwd,
				roles: user.roles
			}
			const mongoUser = await UserModel.create(userObject)
			if (mongoUser) {
				res.status(201).json({ message: `New user ${user.username} created.` })
			} else {
				res.status(400).json({ message: `Failed to create user.` })
			}
		})
	}
	updateUser(): RequestHandler {
		return expressAsyncHandler(async (req: Request, res: Response) => {
			let UserModel = this.factory.userModel
			const user: User | undefined = req.body
			if (!user) {
				res.status(400).json({ message: "All fields are required!" })
				return
			}

			const userModel = await UserModel.findById(user.id).exec()

			if (!userModel) {
				res.status(400).json({ message: "User not found!" })
				return
			}
			const username = user.username
			const duplicate = await UserModel.findOne({ username }).lean().exec()
			if (duplicate && duplicate?._id.toString() !== user.id) {
				res.status(409).json({ message: "Duplicate username!" })
				return
			}

			userModel.roles = user.roles
			userModel.username = user.username
			userModel.active = user.active

			if (user.password) {
				userModel.password = await bcrypt.hash(user.password, 10)
			}

			const updatedUser = await userModel.save()

			res.json({ message: `${updatedUser.username} updated.` })
		})
	}
	deleteUser(): RequestHandler {
		return expressAsyncHandler(async (req: Request, res: Response) => {
			const user: User | undefined = req.body
			const NoteModel = new NotesFactory().createModel()
			const UserModel = this.factory.userModel
			if (!user || !user?.id) {
				res.status(400).json({ message: "User ID Required." })
				return
			}

			const notes: NoteDocument | null = await NoteModel.findOne({
				user: user.id
			})
				.lean()
				.exec()
			if (notes) {
				res.status(400).json({ message: "User has assigned notes." })
				return
			}

			const userModel: UserDocument | null = await UserModel.findById(
				user.id
			).exec()
			if (!userModel) {
				res.status(400).json({ message: "User not found" })
				return
			}

			const result: unknown | null = await UserModel.deleteOne()
			const reply = `Username ${(result as UserDocument).username} with ID ${
				(result as UserDocument).id
			} deleted.`
			res.json(reply)
		})
	}
}
