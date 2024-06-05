// module imports
import express from "express";
import dotenv from "dotenv";
import request from "request";
import cors from "cors";
// routes
// import authRoutes from "./routes/authRoutes/auth.routes.js";
// function import

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_BASE_URL = process.env.JIRA_BASE_URL;

app.use(express.json()); // for parsing the incoming requeset
// Enable CORS for all routes
app.use(cors());

// app.use("/api/auth/", authRoutes);

app.use("/jira", (req, res) => {
  const jiraUrl = `${JIRA_BASE_URL}${req.url}`;
  const auth = `Basic ${Buffer.from(
    `kiranpv82@gmail.com:${JIRA_API_TOKEN}`
  ).toString("base64")}`;
  req
    .pipe(
      request({
        url: jiraUrl,
        headers: { Authorization: auth },
      })
    )
    .pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
