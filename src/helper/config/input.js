import * as core from "@actions/core";
import jsonFile from "../../helper/file/json-file.js";
import HeaderModel from "../../model/input/HeaderModel.js";
import RequestModel from "../../model/input/RequestModel.js";

const input = (() => {
	const INSIGHT_REPOSITORY = process.env.GITHUB_REPOSITORY;
	const AUTH_KEY = process.env.INSIGHTS_TOKEN;
	const USER_AGENT = process.env.USER_AGENT;

	const getUsernameAndRepository = () => {
		return INSIGHT_REPOSITORY?.split("/") || ["", ""];
	};
	const getHeader = async () => {
		return new HeaderModel(AUTH_KEY, USER_AGENT);
	};
	const getRequest = async () => {
		const USERNAME = getUsernameAndRepository()[0];
		const REPOSITORY = getUsernameAndRepository()[1];
		const configJson = await jsonFile.readConfigFile();
		if (configJson.status) {
			core.info("Config Json available");
			core.info(
				`Config Json username='${USERNAME}' insightRepository='${REPOSITORY}' devMode='${configJson.data.devMode}' advancedMode='${configJson.data.advancedMode}' language='${configJson.data.language}' repository='${configJson.data.repository.toString()}'`,
			);
			return new RequestModel(
				true,
				USERNAME,
				REPOSITORY,
				configJson.data.devMode,
				configJson.data.advancedMode,
				configJson.data.language,
				configJson.data.repository,
			);
		}
		core.info("Config Json Error");
		return new RequestModel(false);
	};
	return {
		getHeader: getHeader,
		getRequest: getRequest,
	};
})();

export default input;
