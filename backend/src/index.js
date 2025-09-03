const express = require("express");
const {connectDB} = require('./config/db');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {authRouter} = require("./Routes/authRoutes");
const groupRouter = require("./Routes/groupRoutes");

require('dotenv').config()

const app = express();

connectDB()
.then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
    console.log(`server is connected to port ${process.env.PORT}`);
})
})
.catch(() => {
    console.log("DB not connected");
})

app.use(cors({
    origin: "http://localhost:5173",  // Your frontend's origin
  credentials: true //allow cookies /auth headers
}));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/group", groupRouter);