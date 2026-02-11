import range from "../../core/range.js";
import record from "../../core/record.js";
import jsonFile from "../../helper/file/json-file.js";

const recordCache = (() => {
	const MAXIMUM_DAYS = 365;
	const RECORDS = "records";
	const updateViews = (views, traffic) => {
		const file = [];
		for (const date of range.getDates(MAXIMUM_DAYS)) {
			file.push(record.checkDailyRecord(views, date));
		}
		const update = [];
		for (const view of file) {
			update.push(record.updateDailyRecord(view, traffic));
		}
		return update;
	};
	const createViews = (traffic) => {
		const file = [];
		for (const date of range.getDates(MAXIMUM_DAYS)) {
			file.push(record.createDailyRecord(date, traffic));
		}
		return file;
	};
	const readRecordCacheFile = async (repositoryName) => {
		return await jsonFile.readCacheFile(repositoryName, RECORDS);
	};
	const updateRecordCacheFile = async (repositoryName, traffic) => {
		const records = await jsonFile.readCacheFile(repositoryName, RECORDS);
		if (records.status) {
			const recordViews = updateViews(records.views, traffic);
			await jsonFile.createCacheFile(repositoryName, RECORDS, recordViews);
		} else {
			const recordViews = createViews(traffic);
			await jsonFile.createCacheFile(repositoryName, RECORDS, recordViews);
		}
	};
	return {
		updateRecordCacheFile: updateRecordCacheFile,
		readRecordCacheFile: readRecordCacheFile,
	};
})();

export default recordCache;
