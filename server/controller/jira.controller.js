import axios from "axios";
import dotenv from "dotenv";
import getErrorMessage from "../utils/errorMessages.js";

dotenv.config();

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_EMAIL = process.env.JIRA_EMAIL;

export const proxyJiraRequest = async (req, res) => {
  try {
    const jiraUrl = `${JIRA_BASE_URL}${req.url}`;
    const auth = `Basic ${Buffer.from(
      `${JIRA_EMAIL}:${JIRA_API_TOKEN}`
    ).toString("base64")}`;

    // Make the API request to Jira
    const response = await axios({
      method: req.method,
      url: jiraUrl,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      data: req.body,
    });

    // Send the successful response back to the frontend
    res.status(response.status).json(response.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    const message = error.response
      ? getErrorMessage(statusCode)
      : error.message;

    console.error(`Error: `, message);

    res.status(statusCode).json({ message });
  }
};
