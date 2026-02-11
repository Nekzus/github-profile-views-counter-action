import RequestModel from "../../model/octokit/RequestModel.js";
import requestCommits from "./request-commits.js";

const verifyCommits = (() => {
	const URL = "/commits?path=cache";
	const USERNAME = "github-actions[bot]";
	const verify = async (header, username, repository) => {
		const request = new RequestModel(URL, username, repository);
		const responseCommits = await requestCommits.requestResponseCommits(header, request);
		if (responseCommits.status) {
			for (const commit of responseCommits.response) {
				if (commit !== USERNAME) {
					return false;
				}
			}
			return true;
		}
		return true;
	};
	return {
		verify: verify,
	};
})();

export default verifyCommits;
