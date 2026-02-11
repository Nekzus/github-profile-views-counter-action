import ConfigDataModel from "../../model/config/ConfigDataModel.js";

const ConfigFileModel = function (status, file) {
	this.status = status;
	if (status) this.data = new ConfigDataModel(file);
};

export default ConfigFileModel;
