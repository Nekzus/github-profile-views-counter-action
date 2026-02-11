import fs from "fs-extra";

const directory = (() => {
	const createDirectory = async (directory) => {
		try {
			await fs.ensureDir(directory);
		} catch (error) {
			console.log(error);
		}
	};
	const createGitIgnore = async (directory) => {
		const path = `${directory}/.gitkeep`;
		try {
			await fs.outputFile(path, "");
		} catch (error) {
			console.log(error);
		}
	};
	return {
		createDirectory: createDirectory,
		createGitIgnore: createGitIgnore,
	};
})();

export default directory;
