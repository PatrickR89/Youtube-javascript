"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Notes_1 = require("../models/Notes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    constructor() {
        this.factory = new User_1.UserFactory();
    }
    getAllUsers() {
        return (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            let UserModel = this.factory.userModel;
            const user = yield UserModel.find().select("-password").lean();
            if (!user) {
                res.status(400).json({ message: "No Users Found" });
                return;
            }
            res.json(user);
        }));
    }
    createNewUser() {
        return (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            let UserModel = this.factory.userModel;
            const user = req.body;
            console.log(user);
            if (!(user === null || user === void 0 ? void 0 : user.username) || !(user === null || user === void 0 ? void 0 : user.password) || !Array.isArray(user === null || user === void 0 ? void 0 : user.roles)) {
                res.status(400).json({ message: "All fields are required" });
                return;
            }
            const name = user === null || user === void 0 ? void 0 : user.username;
            const duplicate = yield UserModel.findOne({ name }).lean().exec();
            if (duplicate) {
                res.status(409).json({ message: "User already exists" });
                return;
            }
            const hashedPwd = yield bcrypt_1.default.hash(user.password, 10);
            const userObject = {
                username: user.username,
                password: hashedPwd,
                roles: user.roles
            };
            const mongoUser = yield UserModel.create(userObject);
            if (mongoUser) {
                res.status(201).json({ message: `New user ${user.username} created.` });
            }
            else {
                res.status(400).json({ message: `Failed to create user.` });
            }
        }));
    }
    updateUser() {
        return (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            let UserModel = this.factory.userModel;
            const user = req.body;
            if (!user) {
                res.status(400).json({ message: "All fields are required!" });
                return;
            }
            const userModel = yield UserModel.findById(user.id).exec();
            if (!userModel) {
                res.status(400).json({ message: "User not found!" });
                return;
            }
            const username = user.username;
            const duplicate = yield UserModel.findOne({ username }).lean().exec();
            if (duplicate && (duplicate === null || duplicate === void 0 ? void 0 : duplicate._id.toString()) !== user.id) {
                res.status(409).json({ message: "Duplicate username!" });
                return;
            }
            userModel.roles = user.roles;
            userModel.username = user.username;
            userModel.active = user.active;
            if (user.password) {
                userModel.password = yield bcrypt_1.default.hash(user.password, 10);
            }
            const updatedUser = yield userModel.save();
            res.json({ message: `${updatedUser.username} updated.` });
        }));
    }
    deleteUser() {
        return (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const NoteModel = new Notes_1.NotesFactory().createModel();
            const UserModel = this.factory.userModel;
            if (!user || !(user === null || user === void 0 ? void 0 : user.id)) {
                res.status(400).json({ message: "User ID Required." });
                return;
            }
            const notes = yield NoteModel.findOne({
                user: user.id
            })
                .lean()
                .exec();
            if (notes) {
                res.status(400).json({ message: "User has assigned notes." });
                return;
            }
            const userModel = yield UserModel.findById(user.id).exec();
            if (!userModel) {
                res.status(400).json({ message: "User not found" });
                return;
            }
            const result = yield UserModel.deleteOne();
            const reply = `Username ${result.username} with ID ${result.id} deleted.`;
            res.json(reply);
        }));
    }
}
exports.default = UserController;
