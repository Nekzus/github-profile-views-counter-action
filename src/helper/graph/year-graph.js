import yearCache from "../../helper/cache/year-cache.js";
import GraphFileModel from "../../model/file/GraphFileModel.js";
import graphFile from "../file/graph-file.js";

const yearGraph = (() => {
	const filename = "year";
	const updateYearGraphFile = async (response) => {
		const year = await yearCache.readYearCacheFile(response.repositoryId);
		const labels = [];
		const uniqueData = [];
		const countData = [];
		if (year.status) {
			for (const view of year.views) {
				labels.push(`"${view.timestamp.getFullYear()}/${view.timestamp.getMonth() + 1}"`);
				uniqueData.push(view.uniques);
				countData.push(view.count);
			}
		}
		const graph = new GraphFileModel(labels, uniqueData, countData);
		await graphFile.createGraphFile(response.repositoryId, filename, graph);
	};
	return {
		updateYearGraphFile: updateYearGraphFile,
	};
})();

export default yearGraph;
