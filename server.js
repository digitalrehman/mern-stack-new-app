import expres from "express";
import "dotenv/config";
import routes from "./routes/user.routes.js";
let app = expres();
let port = process.env.PORT || 5000;

app.use(expres.json());
app.use("/api", routes)

app.listen(port, () => console.log(`https://localhost:${port}`));
