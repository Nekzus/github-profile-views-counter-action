import file from "../../core/file.js";

const markdownFile = (() => {
	const README = "readme";
	const createListMarkDownFile = async (repositoryId, fileName, object) => {
		const path = `${README}/${repositoryId}/${fileName}.md`;
		await file.createOtherFile(path, object);
	};
	const createSummaryMarkDownFile = async (object) => {
		const path = "README.md";
		await file.createOtherFile(path, object);
	};
	return {
		createListMarkDownFile: createListMarkDownFile,
		createSummaryMarkDownFile: createSummaryMarkDownFile,
	};
})();

export default markdownFile;
