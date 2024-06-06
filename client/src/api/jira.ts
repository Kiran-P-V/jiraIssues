// src/api/jira.js
import axios from "axios";

const fetchIssues = async (
  projectKey: string,
  startAt: number = 0,
  maxResults: number = 10,
  statusFilter?: string,
  assigneeFilter?: string
) => {
  let jql = `project=${projectKey}`;
  if (statusFilter) jql += ` AND status="${statusFilter}"`;
  if (assigneeFilter) jql += ` AND assignee="${assigneeFilter}"`;

  const url = `http://localhost:4000/jira/rest/api/3/search?jql=${encodeURIComponent(
    jql
  )}&startAt=${startAt}&maxResults=${maxResults}`;

  try {
    console.log({ url });
    const response = await axios.get(url);
    return {
      issues: response.data.issues,
      total: response.data.total,
    };
  } catch (error) {
    throw error;
  }
};

const fetchAssignees = async (projectKey: string) => {
  const url = `http://localhost:4000/jira/rest/api/3/user/assignable/search?project=${projectKey}`;

  try {
    const response = await axios.get(url);
    return response.data.map((user: any) => user.displayName);
  } catch (error) {
    throw error;
  }
};

export { fetchIssues, fetchAssignees };
