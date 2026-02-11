import monthCache from "../../helper/cache/month-cache.js";
import markdownFile from "../file/markdown-file.js";
import markdownTemplate from "./markdown-template.js";

const monthReadme = (() => {
	const MONTH = "month";
	const updateMonthMarkDownFile = async (response, request) => {
		const month = await monthCache.readMonthCacheFile(response.repositoryId);
		const object = await markdownTemplate.createListMarkDownTemplate(month.views, "Month", response, request);
		await markdownFile.createListMarkDownFile(response.repositoryId, MONTH, object);
	};
	return {
		updateMonthMarkDownFile: updateMonthMarkDownFile,
	};
})();

export default monthReadme;
