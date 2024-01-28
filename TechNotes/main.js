"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
class Main {
    constructor() {
        this.app = new app_1.default();
        this.createDbConnection();
    }
    createDbConnection() {
        new dbConnection_1.default().connectDB();
    }
}
new Main();
