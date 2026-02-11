import range from "../../core/range.js";
import recordCacheFile from "../../helper/cache/record-cache.js";
import jsonFile from "../../helper/file/json-file.js";
import SummaryFileModel from "../../model/cache/SummaryFileModel.js";
import SummaryModel from "../../model/cache/SummaryModel.js";

const summaryCache = (() => {
	const SUMMARY = "summary";
	const checkIfUpdated = (date, timestamp) => {
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		if (
			date.getFullYear() === timestamp.getFullYear() &&
			date.getMonth() === timestamp.getMonth() &&
			date.getDate() === timestamp.getDate()
		) {
			return false;
		}
		return !(date.getDate() === today.getDate() || date.getDate() === yesterday.getDate());
	};
	const updateViews = (summaryCache, recordCache) => {
		let timestamp = new Date(summaryCache.views.timestamp);
		let uniques = summaryCache.views.summary.uniques;
		let count = summaryCache.views.summary.count;
		const dateRange = [];
		for (const date of range.getRemainingDates(timestamp)) {
			if (checkIfUpdated(date, timestamp)) {
				dateRange.push(date);
			}
		}
		for (const record of recordCache) {
			for (const date of dateRange) {
				if (
					date.getFullYear() === record.timestamp.getFullYear() &&
					date.getMonth() === record.timestamp.getMonth() &&
					date.getDate() === record.timestamp.getDate()
				) {
					timestamp = record.timestamp;
					uniques = uniques + record.uniques;
					count = count + record.count;
				}
			}
		}
		return { timestamp: timestamp, summary: new SummaryModel(uniques, count) };
	};
	const createViews = (records) => {
		let uniques = 0;
		let count = 0;
		for (const record of records) {
			uniques = uniques + record.uniques;
			count = count + record.count;
		}
		return new SummaryModel(uniques, count);
	};
	const readSummaryCacheFile = async (repositoryName) => await jsonFile.readSummaryCacheFile(repositoryName, SUMMARY);
	const updateSummaryCacheFile = async (repositoryName) => {
		const recordsCache = await recordCacheFile.readRecordCacheFile(repositoryName);
		const summaryCache = await readSummaryCacheFile(repositoryName);
		if (recordsCache.status && summaryCache.status) {
			const summaryViews = updateViews(summaryCache, recordsCache.views);
			await jsonFile.createCacheFile(repositoryName, SUMMARY, summaryViews);
		} else {
			const view = recordsCache.views[recordsCache.views.length - 4];
			const summaryViews = new SummaryFileModel(new Date(view.timestamp), createViews(recordsCache.views));
			await jsonFile.createCacheFile(repositoryName, SUMMARY, summaryViews);
		}
	};
	return {
		updateSummaryCacheFile: updateSummaryCacheFile,
		readSummaryCacheFile: readSummaryCacheFile,
	};
})();

export default summaryCache;
