import recordSummaryFile from "../../helper/cache/summary-cache.js";
import svgFile from "../../helper/file/svg-file.js";
import svg from "../../helper/svg/svg-file.js";

const profileSVG = (() => {
	const updateProfileSVGFile = async (response) => {
		let numberOfViews = 0;
		for (const repository of response) {
			const summaryCache = await recordSummaryFile.readSummaryCacheFile(repository.repositoryId);
			numberOfViews = numberOfViews + summaryCache.views.summary.count;
		}
		const object = await svg.create(numberOfViews);
		await svgFile.createProfileSVGFile(object);
	};
	return {
		updateProfileSVGFile: updateProfileSVGFile,
	};
})();

export default profileSVG;
