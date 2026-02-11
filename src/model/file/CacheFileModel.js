import View from "../cache/ViewModel.js";

const CacheFileModel = function (status, response) {
	const getViewsArray = (views) => {
		const views_array = [];
		for (const view of views) {
			views_array.push(new View(view));
		}
		return views_array;
	};
	this.status = status;
	if (status) this.views = getViewsArray(response);
};

export default CacheFileModel;
