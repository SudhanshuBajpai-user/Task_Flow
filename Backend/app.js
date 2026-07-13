require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo").default;

const authRouter = require("./router/authRouter");
const tasksRouter = require("./router/tasksRouter");
const connectDB = require("./config/db");

const app = express();


// ================================
// TRUST RENDER PROXY
// ================================

app.set("trust proxy", 1);


// ================================
// MIDDLEWARE
// ================================

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());


// ================================
// DATABASE CONNECTION
// ================================

connectDB();


// ================================
// CORS CONFIGURATION
// ================================

app.use(cors({
  origin: "https://task-flow-vuyi.vercel.app",
  credentials: true
}));


// ================================
// SESSION CONFIGURATION
// ================================

app.use(session({
  secret: process.env.SESSION_SECRET,

  resave: false,

  saveUninitialized: false,

  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  }),

  cookie: {
    httpOnly: true,

    sameSite: "none",

    secure: true,

    maxAge: 1000 * 60 * 60 * 24
  }
}));


// ================================
// ROUTES
// ================================

app.use("/", authRouter);

app.use("/tasks", tasksRouter);


// ================================
// SERVER
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});