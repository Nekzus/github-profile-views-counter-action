import ViewModel from "../model/cache/ViewModel.js";

const record = (() => {
	const checkDailyRecord = (views, date) => {
		for (const view of views) {
			if (
				date.getFullYear() === view.timestamp.getFullYear() &&
				date.getMonth() === view.timestamp.getMonth() &&
				date.getDate() === view.timestamp.getDate()
			) {
				return view;
			}
		}
		const emptyView = { timestamp: date, count: 0, uniques: 0 };
		return new ViewModel(emptyView);
	};
	const createDailyRecord = (date, records) => {
		for (const recordItem of records.views) {
			if (
				date.getFullYear() === recordItem.timestamp.getFullYear() &&
				date.getMonth() === recordItem.timestamp.getMonth() &&
				date.getDate() === recordItem.timestamp.getDate()
			) {
				return recordItem;
			}
		}
		const emptyView = { timestamp: date, count: 0, uniques: 0 };
		return new ViewModel(emptyView);
	};
	const updateDailyRecord = (view, traffic) => {
		for (const recordItem of traffic.views) {
			if (
				view.timestamp.getFullYear() === recordItem.timestamp.getFullYear() &&
				view.timestamp.getMonth() === recordItem.timestamp.getMonth() &&
				view.timestamp.getDate() === recordItem.timestamp.getDate()
			) {
				if (view.uniques !== recordItem.uniques || view.count !== recordItem.count) {
					return recordItem;
				}
			}
		}
		return view;
	};
	const createMonthlyRecord = (date, records) => {
		let count = 0;
		let uniques = 0;
		for (const recordItem of records.views) {
			if (
				date.getFullYear() === recordItem.timestamp.getFullYear() &&
				date.getMonth() === recordItem.timestamp.getMonth()
			) {
				count = count + recordItem.count;
				uniques = uniques + recordItem.uniques;
			}
		}
		const view = { timestamp: date, count: count, uniques: uniques };
		return new ViewModel(view);
	};
	const checkMonthlyRecord = (date, views) => {
		for (const view of views) {
			if (date.getFullYear() === view.timestamp.getFullYear() && date.getMonth() === view.timestamp.getMonth()) {
				return view;
			}
		}
		const emptyView = { timestamp: date, count: 0, uniques: 0 };
		return new ViewModel(emptyView);
	};
	const updateMonthlyRecord = (date, records) => {
		let count = 0;
		let uniques = 0;
		for (const recordItem of records.views) {
			if (
				date.getFullYear() === recordItem.timestamp.getFullYear() &&
				date.getMonth() === recordItem.timestamp.getMonth()
			) {
				count = count + recordItem.count;
				uniques = uniques + recordItem.uniques;
			}
		}
		const view = { timestamp: date, count: count, uniques: uniques };
		return new ViewModel(view);
	};
	const checkMonthlyRecordUpdated = (view, updates) => {
		for (const update of updates) {
			if (
				view.timestamp.getFullYear() === update.timestamp.getFullYear() &&
				view.timestamp.getMonth() === update.timestamp.getMonth()
			) {
				if (view.uniques !== update.uniques || view.count !== update.count) {
					return update;
				}
			}
		}
		return view;
	};
	return {
		checkDailyRecord: checkDailyRecord,
		createDailyRecord: createDailyRecord,
		updateDailyRecord: updateDailyRecord,
		checkMonthlyRecord: checkMonthlyRecord,
		createMonthlyRecord: createMonthlyRecord,
		updateMonthlyRecord: updateMonthlyRecord,
		checkMonthlyRecordUpdated: checkMonthlyRecordUpdated,
	};
})();

export default record;
