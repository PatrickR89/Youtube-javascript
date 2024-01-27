import { CorsOptions } from "cors"

type StaticOrigin = boolean | string | RegExp | Array<boolean | string | RegExp>

type CustomOrigin = (
	requestOrigin: string | undefined,
	callback: (err: Error | null, origin?: StaticOrigin) => void
) => void

type Origin = StaticOrigin | CustomOrigin | undefined

export default class CorsSetup {
	allowedOrigins: string[]

	constructor() {
		this.allowedOrigins = ["localhost:3000"]
		this.createCorsConfig = this.createCorsConfig.bind(this)
	}

	createCorsConfig(): CorsOptions {
		const corsOptions: CorsOptions = {
			origin: (
				origin: Origin,
				callback: (err: Error | null, origin?: StaticOrigin | undefined) => void
			) => {
				if (this.allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
					callback(null, true)
				} else {
					callback(new Error("Not allowed by CORS"))
				}
			},
			credentials: true,
			optionsSuccessStatus: 200,
		}

		return corsOptions
	}
}
