import axios from "axios";
import dotenv from "dotenv";

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
    const status = error.response ? error.response.status : 500;
    let message = "An unexpected error occurred.";

    // Determine the error message based on the response status
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message =
            "Bad Request: The server could not understand the request due to invalid syntax.";
          break;
        case 401:
          message =
            "Unauthorized: Access is denied due to invalid credentials.";
          break;
        case 403:
          message =
            "Forbidden: You do not have permission to access this resource.";
          break;
        case 404:
          message = "Not Found: The requested resource could not be found.";
          break;
        case 429:
          message = "Too Many Requests: You have exceeded the API rate limit.";
          break;
        case 500:
          message =
            "Internal Server Error: The server has encountered a situation it doesn't know how to handle.";
          break;
        default:
          message = error.response.data || message;
      }
    } else if (error.request) {
      // Handle cases where no response was received from the server
      message =
        "No response received from the server. Please check your network connection.";
    } else {
      // Handle other errors
      message = error.message;
    }

    // Log the error message for debugging purposes
    console.error(`Error: `, message);

    // Send the error response back to the frontend
    res.status(status).json({ message });
  }
};
