"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
class MainRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get("^/$|/index(.html)?", (req, res) => {
            res.sendFile(path_1.default.join(__dirname, "..", "views", "index.html"));
        });
    }
    returnRouter() {
        return this.router;
    }
}
exports.default = MainRouter;
