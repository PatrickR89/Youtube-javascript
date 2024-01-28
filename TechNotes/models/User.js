"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = exports.Roles = void 0;
const mongoose_1 = require("mongoose");
const MongoFactory_1 = __importDefault(require("./MongoFactory"));
var Roles;
(function (Roles) {
    Roles["employee"] = "Employee";
    Roles["admin"] = "Admin";
})(Roles = exports.Roles || (exports.Roles = {}));
class UserFactory extends MongoFactory_1.default {
    createSchema() {
        return new mongoose_1.Schema({
            username: {
                type: String,
                required: true,
            },
            password: {
                types: String,
                required: true,
            },
            roles: {
                type: [Roles],
                default: Roles.employee,
            },
            active: {
                type: Boolean,
                default: true,
            },
        });
    }
    createModel() {
        const userSchema = this.createSchema();
        return (0, mongoose_1.model)("User", userSchema);
    }
}
exports.UserFactory = UserFactory;
