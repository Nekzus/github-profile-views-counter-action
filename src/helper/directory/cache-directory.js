import * as core from "@actions/core";
import directory from "../../core/directory.js";

const cacheDirectory = (() => {
	const CACHE_DIRECTORY = "cache";
	const create = async () => {
		core.info(`If not exist create '${CACHE_DIRECTORY}' directory`);
		await directory.createDirectory(CACHE_DIRECTORY);
		await directory.createGitIgnore(CACHE_DIRECTORY);
	};
	return {
		create: create,
	};
})();

export default cacheDirectory;
