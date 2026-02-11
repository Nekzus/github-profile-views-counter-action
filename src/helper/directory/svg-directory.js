import * as core from "@actions/core";
import directory from "../../core/directory.js";

const svgDirectory = (() => {
	const SVG_DIRECTORY = "svg";
	const create = async () => {
		core.info(`If not exist create '${SVG_DIRECTORY}' directory`);
		await directory.createDirectory(SVG_DIRECTORY);
		await directory.createGitIgnore(SVG_DIRECTORY);
	};
	return {
		create: create,
	};
})();

export default svgDirectory;
