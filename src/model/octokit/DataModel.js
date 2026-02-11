import ViewModel from "./ViewModel.js";

const DataModel = function (data) {
	const views = (views) => {
		const array = [];
		for (const view of views) {
			array.push(new ViewModel(view));
		}
		return array;
	};
	this.count = data.count;
	this.uniques = data.uniques;
	this.views = views(data.views);
};

export default DataModel;
