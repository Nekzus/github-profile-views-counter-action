import * as core from "@actions/core";
import directory from "../../core/directory.js";

const graphDirectory = (() => {
	const GRAPH_DIRECTORY = "graph";
	const create = async () => {
		core.info(`If not exist create '${GRAPH_DIRECTORY}' directory`);
		await directory.createDirectory(GRAPH_DIRECTORY);
		await directory.createGitIgnore(GRAPH_DIRECTORY);
	};
	return {
		create: create,
	};
})();

export default graphDirectory;
