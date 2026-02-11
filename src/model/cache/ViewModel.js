const ViewModel = function (view) {
	const getDate = (timestamp) => {
		return new Date(timestamp);
	};
	this.timestamp = getDate(view.timestamp);
	this.count = view.count;
	this.uniques = view.uniques;
};

export default ViewModel;
