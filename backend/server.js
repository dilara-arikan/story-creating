import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import storyRoutes from "./routes/story.js";
import ttsRoutes from "./routes/tts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/story", storyRoutes);
app.use("/api/tts", ttsRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
