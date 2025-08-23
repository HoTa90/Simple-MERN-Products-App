import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/products.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/products", router);

app.listen(PORT, () => {
	connectDB();
	console.log("Server is listening at http://localhost:" + PORT + "...");
});
