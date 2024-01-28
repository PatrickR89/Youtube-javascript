"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const root_1 = __importDefault(require("./routes/root"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./middleware/logger"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const mongoose_1 = __importDefault(require("mongoose"));
class ServerApp {
    constructor() {
        this.app = (0, express_1.default)();
        this.router = new root_1.default();
        this.port = Number(process.env.PORT || "3000");
        this.logger = new logger_1.default();
        this.errorHandler = new errorHandler_1.default();
        dotenv_1.default.config();
        this.setup();
        this.listenOnPort();
        this.createErrorPage();
    }
    setup() {
        this.app.use(this.logger.catchRequestEvent);
        this.app.use((0, cors_1.default)(new corsOptions_1.default().createCorsConfig()));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use("/", express_1.default.static(path_1.default.join(__dirname, "public")));
        this.app.use("/", this.router.returnRouter());
    }
    createErrorPage() {
        this.app.all("*", (req, res) => {
            res.status(404);
            if (req.accepts("html")) {
                res.sendFile(path_1.default.join(__dirname, "views", "error.html"));
            }
            else if (req.accepts("json")) {
                res.send({ message: "404 Not Found" });
            }
            else {
                res.type("txt").send("404 Not Found");
            }
        });
        this.app.use(this.errorHandler.handleError);
    }
    listenOnPort() {
        mongoose_1.default.connection.once("open", () => {
            console.log("Connected to Database on 27017");
            this.app.listen(this.port, () => {
                console.log(`App listening on port ${this.port}`);
            });
        });
        mongoose_1.default.connection.on("error", (error) => {
            console.log(error);
            console.log("Error handled from Mongo");
            this.errorHandler.logMongoError(error);
        });
    }
}
exports.default = ServerApp;
