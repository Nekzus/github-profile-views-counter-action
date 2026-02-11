import { Octokit } from "@octokit/rest";
import ResponseModel from "../model/octokit/ResponseModel.js";

let instance = null;

const octokit = {
	request: async (header, request) => {
		if (!instance) {
			instance = new Octokit({
				auth: header.authKey,
				userAgent: header.userAgent,
			});
		}

		try {
			const response = await instance.request(`GET /repos/{owner}/{repo}${request.url}`, {
				owner: request.username,
				repo: request.repository,
			});
			return new ResponseModel(true, response);
		} catch (error) {
			if (error.status === 401) {
				return new ResponseModel(false, `Error ${error.status}. Invalid credentials for 'authentication key'.`);
			}
			if (error.status === 404) {
				return new ResponseModel(
					false,
					`Error ${error.status}. The requested URL '${request.username}/${request.repository}' was not found.`,
				);
			}
			return new ResponseModel(false, `Error ${error.status}. ${error.name}`);
		}
	},
};

export default octokit;
