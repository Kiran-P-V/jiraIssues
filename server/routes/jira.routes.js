import express from "express";
import { proxyJiraRequest } from "../controller/jira.controller.js";

const router = express.Router();

router.get("*", proxyJiraRequest);

export default router;
