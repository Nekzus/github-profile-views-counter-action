import octokit from "../../core/octokit.js";
import ResponseViewsModel from "../../model/octokit/ResponseViewsModel.js";

const requestViews = (() => {
	const requestResponseViews = async (header, request) => {
		const octokitResponse = await octokit.request(header, request);
		if (octokitResponse.status) {
			return new ResponseViewsModel(true, octokitResponse.response);
		}
		return new ResponseViewsModel(false, octokitResponse.response);
	};
	return {
		requestResponseViews: requestResponseViews,
	};
})();

export default requestViews;
