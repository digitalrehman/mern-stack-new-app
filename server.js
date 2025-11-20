import expres from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/user.routes.js";
import connectDB from "./config/dbconnection.js";
let app = expres();
let port = process.env.PORT || 5000;

app.use(expres.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", routes);

connectDB();

app.listen(port, () => console.log(`https://localhost:${port}`));
