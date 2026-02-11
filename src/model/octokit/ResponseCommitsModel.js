const ResponseCommitsModel = function (status, response) {
	const author = (commits) => {
		const array = [];
		for (const commit of commits) {
			array.push(commit.author.login);
		}
		return array;
	};
	this.status = status;
	if (status) {
		this.response = author(response);
	} else {
		this.response = response;
	}
};

export default ResponseCommitsModel;
