"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesFactory = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const MongoFactory_1 = __importDefault(require("./MongoFactory"));
class NotesFactory extends MongoFactory_1.default {
    createSchema() {
        return new mongoose_1.Schema({
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "User",
            },
            title: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            completed: {
                type: Boolean,
                default: false,
            },
        }, {
            timestamps: true,
        });
    }
    createModel() {
        const noteSchema = this.createSchema();
        const AutoIncrement = require("mongoose-sequence")(mongoose_1.default);
        noteSchema.plugin(AutoIncrement, {
            inc_field: "ticket",
            id: "ticketNums",
            start_seq: 500,
        });
        return (0, mongoose_1.model)("Note", noteSchema);
    }
}
exports.NotesFactory = NotesFactory;
