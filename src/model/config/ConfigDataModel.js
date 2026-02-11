const ConfigDataModel = function (file) {
	const languages = ["en-US"];
	const getRepositoryArray = (repositories) => {
		const repository_array = [];
		for (const repository of repositories) {
			repository_array.push(repository);
		}
		return repository_array;
	};
	const getBooleanValue = (value) => {
		return value === "true" || value === true;
	};
	const getLanguageValue = (language) => {
		if (language === undefined) {
			return "en-US";
		}
		if (languages.includes(language)) {
			return language;
		}
		return "en-US";
	};
	this.devMode = getBooleanValue(file.devMode);
	this.advancedMode = getBooleanValue(file.advancedMode);
	this.language = getLanguageValue(file.language);
	this.repository = getRepositoryArray(file.repository);
};

export default ConfigDataModel;
