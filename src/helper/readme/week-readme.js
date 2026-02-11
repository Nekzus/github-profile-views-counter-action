import weekCache from "../../helper/cache/week-cache.js";
import markdownFile from "../file/markdown-file.js";
import markdownTemplate from "./markdown-template.js";

const weekReadme = (() => {
	const filename = "week";
	const updateWeekMarkDownFile = async (response, request) => {
		const week = await weekCache.readWeekCacheFile(response.repositoryId);
		const object = await markdownTemplate.createListMarkDownTemplate(week.views, "Week", response, request);
		await markdownFile.createListMarkDownFile(response.repositoryId, filename, object);
	};
	return {
		updateWeekMarkDownFile: updateWeekMarkDownFile,
	};
})();

export default weekReadme;
