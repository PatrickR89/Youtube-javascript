"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const root_1 = __importDefault(require("./routes/root"));
const path_1 = __importDefault(require("path"));
class ServerApp {
    constructor() {
        this.app = (0, express_1.default)();
        this.router = new root_1.default();
        this.port = Number(process.env.PORT || "3000");
        this.setup();
        this.listenOnPort();
        this.createErrorPage();
    }
    setup() {
        this.app.use("/", express_1.default.static(path_1.default.join(__dirname, "/public")));
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
    }
    listenOnPort() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}
exports.default = ServerApp;
