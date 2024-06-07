# Jira Issues Project

## Overview

This project is a web application that interfaces with Jira's REST API to display Jira issues. The frontend is built using React and Vite, and the backend is powered by Express.js.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- Jira account and API token

### Installation

1. Clone the repository

- git clone https://github.com/Kiran-P-V/jiraIssues.git
- cd jiraIssues

2. Install dependencies for the client

- cd client
- npm install

4. Install dependencies for the server

- cd ../server
- npm install

### Environment Variables

Create environment variable files in both the client and server directories with the following variables:

### Client

- cd ../client

1. Create a file named .env.local

2. Add environment variables

   VITE_APP_PROJECT_KEY=YOUR PROJECT KEY
   VITE_APP_API_BASE_URL=http://localhost:4000

### Server

- cd ../server

1. Create a file named .env

2. Add environment variables

JIRA_BASE_URL=https://your-jira-instance.atlassian.net
JIRA_API_TOKEN=your_jira_api_token
JIRA_EMAIL=your_email@example.com
PORT=4000

### Running the Project

1. Start the backend server

cd ../server
npm run server

2. Start the backend server

cd ../client
npm run dev

_Open your browser and navigate to http://localhost:5173._

### Approach and Decisions

### Frontend

1. Development Framework: The frontend is built using React and Vite. Vite provides a faster and more efficient development experience compared to traditional tooling.
2. Styling: Tailwind CSS is used for styling to ensure a clean and maintainable code structure. Tailwind's utility-first approach allows for rapid UI development and consistent design.

### Backend

1. API Integration: To handle the communication with Jira's REST API, an Express.js backend is created. This backend acts as a proxy server for the frontend, which helps in managing CORS issues and securing the Jira API credentials.
2. CORS Handling: Since directly calling REST APIs from the frontend can result in CORS errors, the backend is configured to handle these requests and ensure smooth communication between the frontend and Jira API.

### Project Structure

1. Monorepo Architecture: The project is organized in a monorepo structure, which simplifies project management and deployment. Both the frontend and backend codebases are maintained within a single repository.
2. Hosting: The application is hosted on render.com, which provides a seamless hosting experience for both the frontend and backend services. Render.com handles the deployment and scaling, ensuring the application is always available and performant.

   _This structured approach ensures a well-organized, scalable, and maintainable project, making it easier to develop, deploy, and manage over time._
