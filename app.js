const express = require("express");
const morgan = require("morgan");
// const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

const visitorRouter = require("./routes/visitorRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

//GLOBAL MIDDLEWARES
//implement CORS
app.use(cors({ credentials: true }));

app.options("*", cors());

app.use(helmet());

//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Limit requests from same API

// const limiter = rateLimit({
//   max: 1000,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });

// app.use("/api", limiter);

//Body parser, reading data from body into req.body
// app.use(express.json({ limit: "50kb" }));
app.use(express.json());

//Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter polution
// app.use(hpp({ whitelist: ["name"] }));

//Serving static files
app.use(express.static(`${__dirname}/public`));

// app.get("/api/v1/visitors", getAllVisitors);

// app.get("/api/v1/visitors/:id", getVisitor);

// app.post("/api/v1/visitors", createVisitor);

// app.patch("/api/v1/visitors/:id", updateVisitor);

// app.delete("/api/v1/visitors/:id", deleteVisitor);

app.use("/api/v1/visitors", visitorRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.statusCode = 404;
  // err.status = "fail";

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
