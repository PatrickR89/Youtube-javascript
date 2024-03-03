"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
class UserRouter {
    constructor() {
        this.controller = new UserController_1.default();
        this.createUserRoutes = this.createUserRoutes.bind(this);
    }
    createUserRoutes() {
        let router = (0, express_1.Router)();
        router
            .route("/")
            .get(this.controller.getAllUsers())
            .post(this.controller.createNewUser())
            .patch(this.controller.updateUser())
            .delete(this.controller.deleteUser());
        return router;
    }
}
exports.UserRouter = UserRouter;
