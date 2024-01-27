import { format } from "date-fns"
import { v4 as uuid } from "uuid"
import fs from "node:fs"
import path from "path"
import { Request, Response } from "express"

export default class Logger {
	constructor() {
		this.catchRequestEvent = this.catchRequestEvent.bind(this)
	}

	async logEvents(message: string, logFileName: string) {
		const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`
		const logItem = `${dateTime}\t${uuid()}\t${message}\n`

		try {
			if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
				await fs.promises.mkdir(path.join(__dirname, "..", "logs"))
			}

			await fs.promises.appendFile(
				path.join(__dirname, "..", "logs", logFileName),
				logItem
			)
		} catch (error) {
			console.log(error)
		}
	}

	catchRequestEvent(req: Request, res: Response, next: () => void) {
		this.logEvents(
			`${req.method}\t${req.url}\t${req.headers.origin}`,
			"reqLog.log"
		)
		console.log(`${req.method} ${req.path}`)
		next()
	}
}
