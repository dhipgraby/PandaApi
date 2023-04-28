"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const api_1 = require("./controllers/api");
const swagger_1 = __importDefault(require("../swagger"));
const cors_1 = __importDefault(require("cors")); // Updated this lin
// Create Express server
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
// Express configuration
app.set("port", (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public"), { maxAge: 31557600000 }));
// Swagger setup
const swaggerSpec = (0, swagger_1.default)();
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
(0, api_1.loadApiEndpoints)(app);
exports.default = app;
