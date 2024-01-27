"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CorsSetup {
    constructor() {
        this.allowedOrigins = ["localhost:3000"];
        this.createCorsConfig = this.createCorsConfig.bind(this);
    }
    createCorsConfig() {
        const corsOptions = {
            origin: (origin, callback) => {
                if (this.allowedOrigins.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                }
                else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true,
            optionsSuccessStatus: 200,
        };
        return corsOptions;
    }
}
exports.default = CorsSetup;
