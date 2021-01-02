import { Octokit } from "@octokit/core";
const username = process.env.VUE_APP_GITHUB_USERNAME;
const reponame = process.env.VUE_APP_GITHUB_reponame;
const octokit = new Octokit({ auth: process.env.VUE_APP_GITHUB_token });

export default octokit;
export { username, reponame };
