import express, { Request, Response, Express } from "express"
import MainRouter from "./routes/root"
import path from "path"
import Logger from "./middleware/logger"
import ErrorHandler from "./middleware/errorHandler"
import cookieParser from "cookie-parser"
import cors from "cors"
import CorsSetup from "./config/corsOptions"

export default class ServerApp {
	app: Express
	router: MainRouter
	port: Number
	logger: Logger
	errorHandler: ErrorHandler

	constructor() {
		this.app = express()
		this.router = new MainRouter()
		this.port = Number(process.env.PORT || "3000")
		this.logger = new Logger()
		this.errorHandler = new ErrorHandler()
		this.setup()
		this.listenOnPort()
		this.createErrorPage()
	}

	setup() {
		this.app.use(this.logger.catchRequestEvent)
		this.app.use(cors(new CorsSetup().createCorsConfig()))
		this.app.use(express.json())
		this.app.use(cookieParser())
		this.app.use("/", express.static(path.join(__dirname, "public")))
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

		this.app.use(this.errorHandler.handleError)
	}

	listenOnPort() {
		this.app.listen(this.port, () => {
			console.log(`App listening on port ${this.port}`)
		})
	}
}
