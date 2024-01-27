import Logger from "./logger"
import { Request, Response } from "express"

export default class ErrorHandler {
	logger: Logger

	constructor() {
		this.logger = new Logger()
		this.handleError = this.handleError.bind(this)
	}

	handleError(err: Error, req: Request, res: Response, next: () => void) {
		this.logger.logEvents(
			`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
			"errorLog.log"
		)
		console.log(`${err.stack}`)

		const status = res.statusCode ? res.statusCode : 500
		res.status(status)
		res.json({ message: err.message })
	}
}
