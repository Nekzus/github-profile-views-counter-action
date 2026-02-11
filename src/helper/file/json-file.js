import file from "../../core/file.js";

const jsonFile = (() => {
	const CACHE = "cache";
	const createCacheFile = async (repositoryName, fileName, object) => {
		const path = `${CACHE}/${repositoryName}/${fileName}.json`;
		await file.createJsonFile(path, object);
	};
	const readCacheFile = async (repositoryName, fileName) => {
		const path = `${CACHE}/${repositoryName}/${fileName}.json`;
		return await file.readCacheFile(path);
	};
	const readConfigFile = async () => {
		const path = "config.json";
		return await file.readConfigFile(path);
	};
	const readSummaryCacheFile = async (repositoryName, fileName) => {
		const path = `${CACHE}/${repositoryName}/${fileName}.json`;
		return await file.readSummaryFile(path);
	};
	return {
		createCacheFile: createCacheFile,
		readCacheFile: readCacheFile,
		readConfigFile: readConfigFile,
		readSummaryCacheFile: readSummaryCacheFile,
	};
})();

export default jsonFile;
