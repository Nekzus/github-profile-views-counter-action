import recordSummaryFile from "../../helper/cache/summary-cache.js";
import svgFile from "../../helper/file/svg-file.js";
import svg from "../../helper/svg/svg-file.js";

const summarySVG = (() => {
	const filename = "badge";
	const updateSummarySVGFile = async (repositoryName) => {
		const summaryCache = await recordSummaryFile.readSummaryCacheFile(repositoryName);
		const object = await svg.create(summaryCache.views.summary.count);
		await svgFile.createBadgeSVGFile(repositoryName, filename, object);
	};
	return {
		updateSummarySVGFile: updateSummarySVGFile,
	};
})();

export default summarySVG;
