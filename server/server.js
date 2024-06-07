import express from "express";
import config from "./config/config.js";
import router from "./routes/jira.routes.js";
import corsMiddleware from "./middlewares/corsMiddlewares.js";

const app = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Routes
app.use("/jira", router);

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log("Allowed origins:", corsOptions.origin);
});
