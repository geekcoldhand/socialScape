import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import { createPost } from "./controllers/post.js";
import { verifyToken } from "./middleware/auth.js";

// CONFIG
dotenv.config();
mongoose.set('strictQuery', true);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3003;

// MIDDLEWARE
app.use(express.json());
app.use(helmet());

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);
app.use(morgan("commmon"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("./assets", express.static(path.join(__dirname, "public/assests"))); // set dir of assets

// FILE STORGAE:
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }); //picture and other files uploaded with multer

// Routes with files (cannont move from server)
app.post("/auth/register", upload.single("picture"), register);

app.post("/post", verifyToken, upload.single("picture"), createPost); //making new post

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/post", postRoutes);

console.log("mongo url .. .", process.env.MONGO_URL)
// mongoose
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(PORT, () =>
    console.log(`DB now connected 🚀 listening http://localhost:${PORT}`)
  );
});
