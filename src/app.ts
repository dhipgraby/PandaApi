import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { loadApiEndpoints } from "./controllers/api";
import { loadTestApiEndpoints } from "./controllers/test/api";
import loadSwagger from '../swagger';
import cors from 'cors'; // Updated this lin

// Create Express server
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Express configuration
app.set("port", process.env.PORT ?? 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

// Swagger setup
const swaggerSpec = loadSwagger();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

(process.env.RUN_PROD_ENV === "true") ? loadApiEndpoints(app) : loadTestApiEndpoints(app)

export default app;
