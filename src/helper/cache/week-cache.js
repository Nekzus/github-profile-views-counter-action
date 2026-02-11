import range from "../../core/range.js";
import record from "../../core/record.js";
import recordCacheFile from "../../helper/cache/record-cache.js";
import jsonFile from "../../helper/file/json-file.js";

const weekCache = (() => {
	const MAXIMUM_DAYS = 7;
	const WEEK = "week";
	const createViews = (records) => {
		const week = [];
		for (const date of range.getDates(MAXIMUM_DAYS)) {
			week.push(record.createDailyRecord(date, records));
		}
		return week;
	};
	const readWeekCacheFile = async (repositoryName) => await jsonFile.readCacheFile(repositoryName, WEEK);
	const updateWeekCacheFile = async (repositoryName) => {
		const records = await recordCacheFile.readRecordCacheFile(repositoryName);
		if (records.status) {
			const weekViews = createViews(records);
			await jsonFile.createCacheFile(repositoryName, WEEK, weekViews);
		}
	};
	return {
		updateWeekCacheFile: updateWeekCacheFile,
		readWeekCacheFile: readWeekCacheFile,
	};
})();

export default weekCache;
