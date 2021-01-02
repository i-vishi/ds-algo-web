import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_token });

export default octokit;
