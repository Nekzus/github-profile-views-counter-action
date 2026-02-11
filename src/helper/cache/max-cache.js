import range from "../../core/range.js";
import record from "../../core/record.js";
import recordCacheFile from "../../helper/cache/record-cache.js";
import jsonFile from "../../helper/file/json-file.js";

const maxCache = (() => {
	const MAXIMUM_MONTHS = 60;
	const UPDATE_MINIMUM_MONTHS = 1;
	const MAX = "max";
	const updateViews = (maxRecords, records) => {
		const viewsFromFile = [];
		for (const date of range.getMonths(MAXIMUM_MONTHS)) {
			viewsFromFile.push(record.checkMonthlyRecord(date, maxRecords.views));
		}
		const updateMonth = [];
		for (const date of range.getMonths(UPDATE_MINIMUM_MONTHS)) {
			updateMonth.push(record.updateMonthlyRecord(date, records));
		}
		const updates = [];
		for (const view of viewsFromFile) {
			updates.push(record.checkMonthlyRecordUpdated(view, updateMonth));
		}
		return updates;
	};
	const createViews = (records) => {
		const max = [];
		for (const date of range.getMonths(MAXIMUM_MONTHS)) {
			max.push(record.createMonthlyRecord(date, records));
		}
		return max;
	};
	const readMaxCacheFile = async (repositoryName) => await jsonFile.readCacheFile(repositoryName, MAX);
	const updateMaxCacheFile = async (repositoryName) => {
		const records = await recordCacheFile.readRecordCacheFile(repositoryName);
		const maxRecords = await readMaxCacheFile(repositoryName);
		if (records.status && maxRecords.status) {
			const maxViews = updateViews(maxRecords, records);
			await jsonFile.createCacheFile(repositoryName, MAX, maxViews);
		} else {
			const maxViews = createViews(records);
			await jsonFile.createCacheFile(repositoryName, MAX, maxViews);
		}
	};
	return {
		updateMaxCacheFile: updateMaxCacheFile,
		readMaxCacheFile: readMaxCacheFile,
	};
})();

export default maxCache;
