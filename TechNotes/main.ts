import App from "./app"
import MongooseProvider from "./config/dbConnection"

class Main {
	app: App

	constructor() {
		this.app = new App()
		this.createDbConnection()
	}

	createDbConnection() {
		new MongooseProvider().connectDB()
	}
}

new Main()
