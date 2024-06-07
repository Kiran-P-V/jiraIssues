# Jira Issues Project

## Overview

This project is a web application that interfaces with Jira's REST API to display Jira issues. The frontend is built using React and Vite, and the backend is powered by Express.js.

├── client
│ ├── public
│ ├── src
│ │ ├── components
│ │ ├── views
│ │ ├── App.tsx
│ │ ├── index.tsx
│ │ └── ...
│ ├── .env
│ ├── index.html
│ ├── package.json
│ ├── tsconfig.json
│ └── vite.config.ts
├── server
│ ├── config
│ ├── controllers
│ ├── middlewares
│ ├── routes
│ ├── utils
│ ├── .env
│ ├── package.json
│ └── server.js
├── .gitignore
└── README.md

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
