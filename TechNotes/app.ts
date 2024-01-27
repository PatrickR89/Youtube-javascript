import express, { Request, Response, Express } from "express"
import MainRouter from "./routes/root"
import path from "path"

export default class ServerApp {
	app: Express
	router: MainRouter
	port: Number

	constructor() {
		this.app = express()
		this.router = new MainRouter()
		this.port = Number(process.env.PORT || "3000")
		this.setup()
		this.listenOnPort()
		this.createErrorPage()
	}

	setup() {
		this.app.use("/", express.static(path.join(__dirname, "/public")))
		this.app.use("/", this.router.returnRouter())
	}

	createErrorPage() {
		this.app.all("*", (req: Request, res: Response) => {
			res.status(404)
			if (req.accepts("html")) {
				res.sendFile(path.join(__dirname, "views", "error.html"))
			} else if (req.accepts("json")) {
				res.send({ message: "404 Not Found" })
			} else {
				res.type("txt").send("404 Not Found")
			}
		})
	}

	listenOnPort() {
		this.app.listen(this.port, () => {
			console.log(`App listening on port ${this.port}`)
		})
	}
}
