require("dotenv").config();
const express=require('express');
const session = require('express-session');
const authRouter=require('./router/authRouter');
const cors = require('cors');
const connectDB = require("./config/db");
const tasksRouter = require('./router/tasksRouter');
const MongoStore = require('connect-mongo').default;

const app=express();


app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
connectDB();


app.use(cors({
  origin: true,
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  }),
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24  // 1 day
  }
}));

app.use("/",authRouter);
app.use("/tasks",tasksRouter)


PORT=5000;
app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
});