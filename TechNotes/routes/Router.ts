import { Router, Request, Response } from "express"
import path from "path"
import { UserRouter } from "./UserRouter"

export class MainRouter {
	router: Router = Router()
	userRouter: Router = new UserRouter().createUserRoutes()

	constructor() {
		this.setupRoutes()
	}

	setupRoutes() {
		this.router.get("^/$|/index(.html)?", (req: Request, res: Response) => {
			res.sendFile(path.join(__dirname, "..", "views", "index.html"))
		})

		this.router.use("/user", this.userRouter)
	}

	returnRouter(): Router {
		return this.router
	}
}
