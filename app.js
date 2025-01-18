const express = require("express");
const morgan = require("morgan");

const visitorRouter = require("./routes/visitorRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.get("/api/v1/visitors", getAllVisitors);

// app.get("/api/v1/visitors/:id", getVisitor);

// app.post("/api/v1/visitors", createVisitor);

// app.patch("/api/v1/visitors/:id", updateVisitor);

// app.delete("/api/v1/visitors/:id", deleteVisitor);

app.use("/api/v1/visitors", visitorRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = "fail";

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
