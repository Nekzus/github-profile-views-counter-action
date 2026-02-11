import RepositoryModel from "./RespositoryModel.js";

const ResponseRepositoryModel = function (status, response) {
	this.status = status;
	if (status) {
		this.response = new RepositoryModel(response.data);
	} else {
		this.response = response;
	}
};

export default ResponseRepositoryModel;
