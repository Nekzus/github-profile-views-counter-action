import monthCache from "../../helper/cache/month-cache.js";
import GraphFileModel from "../../model/file/GraphFileModel.js";
import graphFile from "../file/graph-file.js";

const monthGraph = (() => {
	const filename = "month";
	const updateMonthGraphFile = async (response) => {
		const month = await monthCache.readMonthCacheFile(response.repositoryId);
		const labels = [];
		const uniqueData = [];
		const countData = [];
		if (month.status) {
			for (const view of month.views) {
				labels.push(`"${view.timestamp.getMonth() + 1}/${view.timestamp.getDate()}"`);
				uniqueData.push(view.uniques);
				countData.push(view.count);
			}
		}
		const graph = new GraphFileModel(labels, uniqueData, countData);
		await graphFile.createGraphFile(response.repositoryId, filename, graph);
	};
	return {
		updateMonthGraphFile: updateMonthGraphFile,
	};
})();

export default monthGraph;
