"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
class ErrorHandler {
    constructor() {
        this.logger = new logger_1.default();
        this.handleError = this.handleError.bind(this);
        this.logMongoError = this.logMongoError.bind(this);
        this.logAnyError = this.logAnyError.bind(this);
    }
    handleError(err, req, res, next) {
        this.logger.logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errorLog.log");
        console.log(`${err.stack}`);
        const status = res.statusCode ? res.statusCode : 500;
        res.status(status);
        res.json({ message: err.message });
    }
    logMongoError(error) {
        this.logger.logEvents(`${error.name}: ${error.message}\t${error["cause"]}`, "errorLog.log");
    }
    logAnyError(error) {
        this.logger.logEvents(`${error.name}: ${error.message}`, "errorLog.log");
    }
}
exports.default = ErrorHandler;
