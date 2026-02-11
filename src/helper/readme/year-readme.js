import yearCache from "../../helper/cache/year-cache.js";
import markdownFile from "../file/markdown-file.js";
import markdownTemplate from "./markdown-template.js";

const yearReadme = (() => {
	const YEAR = "year";
	const updateYearMarkDownFile = async (response, request) => {
		const year = await yearCache.readYearCacheFile(response.repositoryId);
		const object = await markdownTemplate.createListMarkDownTemplate(year.views, "Year", response, request);
		await markdownFile.createListMarkDownFile(response.repositoryId, YEAR, object);
	};
	return {
		updateYearMarkDownFile: updateYearMarkDownFile,
	};
})();

export default yearReadme;
