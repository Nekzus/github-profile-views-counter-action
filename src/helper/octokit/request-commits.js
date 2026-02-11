import octokit from "../../core/octokit.js";
import ResponseCommitsModel from "../../model/octokit/ResponseCommitsModel.js";

const requestCommits = (() => {
	const requestResponseCommits = async (header, request) => {
		const octokitResponse = await octokit.request(header, request);
		if (octokitResponse.status) {
			const data = octokitResponse.response.data;
			if (data.length === 0) {
				return new ResponseCommitsModel(false, octokitResponse.response);
			}
			return new ResponseCommitsModel(true, data);
		}
		return new ResponseCommitsModel(false, octokitResponse.response);
	};
	return {
		requestResponseCommits: requestResponseCommits,
	};
})();

export default requestCommits;
