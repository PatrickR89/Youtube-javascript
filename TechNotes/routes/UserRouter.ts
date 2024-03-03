import { Router } from "express"
import UserController from "../controllers/UserController"

export class UserRouter {
	controller: UserController

	constructor() {
		this.controller = new UserController()
		this.createUserRoutes = this.createUserRoutes.bind(this)
	}
	createUserRoutes(): Router {
		let router = Router()

		router
			.route("/")
			.get(this.controller.getAllUsers())
			.post(this.controller.createNewUser())
			.patch(this.controller.updateUser())
			.delete(this.controller.deleteUser())

		return router
	}
}
