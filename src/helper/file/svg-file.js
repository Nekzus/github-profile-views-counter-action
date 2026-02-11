import file from "../../core/file.js";

const svgFile = (() => {
	const SVG = "svg";
	const createBadgeSVGFile = async (repositoryName, fileName, object) => {
		const path = `${SVG}/${repositoryName}/${fileName}.svg`;
		await file.createOtherFile(path, object);
	};
	const createProfileSVGFile = async (object) => {
		const path = `${SVG}/profile/badge.svg`;
		await file.createOtherFile(path, object);
	};
	return {
		createBadgeSVGFile: createBadgeSVGFile,
		createProfileSVGFile: createProfileSVGFile,
	};
})();

export default svgFile;
