import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import morgan from "morgan";
import cors from "cors"; 
import testrou from "./test/test.routes";
import notesRoute from "./Notes/notes.routes";
import classRoutes from './Class/class.routes'
import chapterRoutes from './Chapters/chapters.routes'
import authRoutes from './Auth/auth.routes'
// import bodyParser from "body-parser";
const app = express();
app.use(morgan("dev"))
app.use(express.json({
    limit: "50mb"
}));

app.use(cors({
    origin: "*", //process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204
}))


app.use("/api/test", testrou)
app.use("/api/notes", notesRoute)
app.use("/api/class", classRoutes)
app.use("/api/chapter", chapterRoutes)
app.use("/api/auth", authRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Endpoint Not found"))
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message
    });
});


export default app;
