import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  jiraApiToken: process.env.JIRA_API_TOKEN,
  jiraBaseUrl: process.env.JIRA_BASE_URL,
  jiraEmail: process.env.JIRA_EMAIL,
};

export default config;
