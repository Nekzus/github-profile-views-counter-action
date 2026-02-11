import weekCache from "../../helper/cache/week-cache.js";
import graphFile from "../../helper/file/graph-file.js";
import GraphFileModel from "../../model/file/GraphFileModel.js";

const weekGraph = (() => {
	const filename = "week";
	const updateWeekGraphFile = async (response) => {
		const week = await weekCache.readWeekCacheFile(response.repositoryId);
		const labels = [];
		const uniqueData = [];
		const countData = [];
		if (week.status) {
			for (const view of week.views) {
				labels.push(`"${view.timestamp.getMonth() + 1}/${view.timestamp.getDate()}"`);
				uniqueData.push(view.uniques);
				countData.push(view.count);
			}
		}
		const graph = new GraphFileModel(labels, uniqueData, countData);
		await graphFile.createGraphFile(response.repositoryId, filename, graph);
	};
	return {
		updateWeekGraphFile: updateWeekGraphFile,
	};
})();

export default weekGraph;
