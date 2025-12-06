import expres from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/user.routes.js";
import connectDB from "./config/dbconnection.js";
import categoryRoutes from "./routes/category.route.js";
let app = expres();
let port = process.env.PORT || 5000;

app.use(expres.json({ limit: "50mb" }));
app.use(expres.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(cookieParser());
app.use("/api/auth", routes);
app.use("/api/category", categoryRoutes);

connectDB();

app.listen(port, () => console.log(`https://localhost:${port}`));
