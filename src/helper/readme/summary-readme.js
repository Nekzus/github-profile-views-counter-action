import markdownFile from "../file/markdown-file.js";
import markdownTemplate from "./markdown-template.js";

const summaryReadme = (() => {
	const updateSummaryMarkDownFileAdvanced = async (response, request) => {
		const object = await markdownTemplate.createSummaryMarkDownTemplateAdvanced(response, request.insightsRepository);
		await markdownFile.createSummaryMarkDownFile(object);
	};
	const updateSummaryMarkDownFileBasic = async (response, request) => {
		const object = await markdownTemplate.createSummaryMarkDownTemplateBasic(response, request.insightsRepository);
		await markdownFile.createSummaryMarkDownFile(object);
	};
	return {
		updateSummaryMarkDownFileAdvanced: updateSummaryMarkDownFileAdvanced,
		updateSummaryMarkDownFileBasic: updateSummaryMarkDownFileBasic,
	};
})();

export default summaryReadme;
