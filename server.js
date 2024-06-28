require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

if (!process.env.DATABASE_URL) {
    console.error("Missing DATABASE_URL environment variable");
    process.exit(1);
}

if (!process.env.PORT) {
    console.error("Missing PORT environment variable");
    process.exit(1);
}

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
const db = mongoose.connection;

app.use(cors());
app.use(express.json());

db.on("error", (err) => console.error(err));
db.once("open", () => console.log("DATABASE CONNECTED"));

const tasRouter = require("./routes/tasks");
app.use("/api/tasks", tasRouter);

const server = app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

// Increase server timeout values
server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds
