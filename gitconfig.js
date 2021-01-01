import { Octokit } from "@octokit/core";
const config = require("./config.json");

const octokit = new Octokit({ auth: config.token });

export default octokit;
