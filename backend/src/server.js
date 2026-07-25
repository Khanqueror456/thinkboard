// import "./config/env.js"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dns from "dns"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

//Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"])

const app = express();

app.use(cors({
    origin : ["http://localhost:5173"]
}));
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);


app.use((req, res, next) => {
    console.log(`Req method is ${req.method} and URL is ${req.url}`)
    next()
})

app.use("/api/notes", notesRoutes);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(process.env.PORT, () => {
            console.log(`Server started on PORT ${process.env.PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to database:", err);
        process.exit(1);
    }
};

startServer();