import cors from "cors";
const corsOptions = {
    origin: ['http://localhost:5173', 'https://jira-issues-teal.vercel.app/'],
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
    