import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import cors from "cors";
import testrou from "./test/test.routes";
import notesRoute from "./Notes/notes.routes";
const app = express();
app.use(morgan("dev"))
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204
}))


app.use("/api/test", testrou)
app.use("/api/notes", notesRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Endpoint Not found"))
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});


export default app;
