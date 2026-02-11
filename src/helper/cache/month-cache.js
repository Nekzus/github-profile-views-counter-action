import range from "../../core/range.js";
import record from "../../core/record.js";
import recordCacheFile from "../../helper/cache/record-cache.js";
import jsonFile from "../../helper/file/json-file.js";

const monthCache = (() => {
	const DAYS = 30;
	const MONTH = "month";
	const createViews = (records) => {
		const month = [];
		for (const date of range.getDates(DAYS)) {
			month.push(record.createDailyRecord(date, records));
		}
		return month;
	};
	const readMonthCacheFile = async (repositoryName) => {
		return await jsonFile.readCacheFile(repositoryName, MONTH);
	};
	const updateMonthCacheFile = async (repositoryName) => {
		const records = await recordCacheFile.readRecordCacheFile(repositoryName);
		if (records.status) {
			const monthViews = createViews(records);
			await jsonFile.createCacheFile(repositoryName, MONTH, monthViews);
		}
	};
	return {
		updateMonthCacheFile: updateMonthCacheFile,
		readMonthCacheFile: readMonthCacheFile,
	};
})();

export default monthCache;
