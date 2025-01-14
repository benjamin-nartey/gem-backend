const express = require("express");
const morgan = require("morgan");

const visitorRouter = require("./routes/visitorRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// app.get("/api/v1/visitors", getAllVisitors);

// app.get("/api/v1/visitors/:id", getVisitor);

// app.post("/api/v1/visitors", createVisitor);

// app.patch("/api/v1/visitors/:id", updateVisitor);

// app.delete("/api/v1/visitors/:id", deleteVisitor);

app.use("/api/v1/visitors", visitorRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
