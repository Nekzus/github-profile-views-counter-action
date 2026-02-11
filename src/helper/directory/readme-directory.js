import * as core from "@actions/core";
import directory from "../../core/directory.js";

const readmeDirectory = (() => {
	const README_DIRECTORY = "readme";
	const create = async () => {
		core.info(`If not exist create '${README_DIRECTORY}' directory`);
		await directory.createDirectory(README_DIRECTORY);
		await directory.createGitIgnore(README_DIRECTORY);
	};
	return {
		create: create,
	};
})();

export default readmeDirectory;
