import express, { Router, Request, Response } from "express"
import path from "path"

export default class MainRouter {
	router: Router

	constructor() {
		this.router = Router()
		this.setupRoutes()
	}

	setupRoutes() {
		this.router.get("^/$|/index(.html)?", (req: Request, res: Response) => {
			res.sendFile(path.join(__dirname, "..", "views", "index.html"))
		})
	}

	returnRouter(): Router {
		return this.router
	}
}
