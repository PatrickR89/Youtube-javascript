import Logger from "./logger"
import { Request, Response } from "express"
import { MongoSystemError, MongoServerError } from "mongodb"

export default class ErrorHandler {
	logger: Logger

	constructor() {
		this.logger = new Logger()
		this.handleError = this.handleError.bind(this)
		this.logMongoError = this.logMongoError.bind(this)
		this.logAnyError = this.logAnyError.bind(this)
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

	logMongoError(error: MongoSystemError | MongoServerError) {
		this.logger.logEvents(
			`${error.name}: ${error.message}\t${error["cause"]}`,
			"errorLog.log"
		)
	}

	logAnyError(error: Error) {
		this.logger.logEvents(`${error.name}: ${error.message}`, "errorLog.log")
	}
}
