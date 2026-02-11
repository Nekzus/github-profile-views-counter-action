import range from "../../core/range.js";
import record from "../../core/record.js";
import recordCacheFile from "../../helper/cache/record-cache.js";
import jsonFile from "../../helper/file/json-file.js";

const yearCache = (() => {
	const MAXIMUM_MONTHS = 12;
	const MINIMUM_MONTHS = 1;
	const YEAR = "year";
	const updateViews = (yearRecords, records) => {
		const viewsFromFile = [];
		for (const date of range.getMonths(MAXIMUM_MONTHS)) {
			viewsFromFile.push(record.checkMonthlyRecord(date, yearRecords.views));
		}
		const updateMonth = [];
		for (const date of range.getMonths(MINIMUM_MONTHS)) {
			updateMonth.push(record.updateMonthlyRecord(date, records));
		}
		const updates = [];
		for (const view of viewsFromFile) {
			updates.push(record.checkMonthlyRecordUpdated(view, updateMonth));
		}
		return updates;
	};
	const createViews = (records) => {
		const month = [];
		for (const date of range.getMonths(MAXIMUM_MONTHS)) {
			month.push(record.createMonthlyRecord(date, records));
		}
		return month;
	};
	const readYearCacheFile = async (repositoryName) => await jsonFile.readCacheFile(repositoryName, YEAR);
	const updateYearCacheFile = async (repositoryName) => {
		const records = await recordCacheFile.readRecordCacheFile(repositoryName);
		const yearRecords = await readYearCacheFile(repositoryName);
		if (records.status && yearRecords.status) {
			const yearViews = updateViews(yearRecords, records);
			await jsonFile.createCacheFile(repositoryName, YEAR, yearViews);
		} else {
			const yearViews = createViews(records);
			await jsonFile.createCacheFile(repositoryName, YEAR, yearViews);
		}
	};
	return {
		updateYearCacheFile: updateYearCacheFile,
		readYearCacheFile: readYearCacheFile,
	};
})();

export default yearCache;
