import octokit from "../../core/octokit.js";
import ResponseRepositoryModel from "../../model/octokit/ResponseRepositoryModel.js";

const requestRepository = (() => {
	const request = async (header, request) => {
		const octokitResponse = await octokit.request(header, request);
		if (octokitResponse.status) {
			return new ResponseRepositoryModel(true, octokitResponse.response);
		}
		return new ResponseRepositoryModel(false, octokitResponse.response);
	};
	return {
		request: request,
	};
})();

export default requestRepository;
