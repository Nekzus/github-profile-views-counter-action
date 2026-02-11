import recordSummaryFile from "../../helper/cache/summary-cache.js";

const markdownTemplate = (() => {
	const ACTION_NAME = "GitHub Profile Views Counter";
	const ACTION_URL = "https://github.com/gayanvoice/github-profile-views-counter";
	const AUTHOR_NAME = "gayanvoice";
	const AUTHOR_URL = "https://github.com/gayanvoice";
	const getDate = () => {
		const options = {
			timeZone: "America/Argentina/Buenos_Aires",
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: false,
		};
		const date = new Intl.DateTimeFormat("es-AR", options).format(new Date());
		return `${date} ART`;
	};

	const formatDate = (timestamp) => {
		const options = {
			timeZone: "America/Argentina/Buenos_Aires",
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: false,
		};
		const date = new Intl.DateTimeFormat("es-AR", options).format(new Date(timestamp));
		return `${date} ART`;
	};
	const footerComponent = (actionName, actionUrl, authorName, authorUrl) => {
		let markdown = `[**Set up ${actionName} for your repositories**](${actionUrl})\n`;
		markdown = `${markdown}## ⛔ DO NOT\n`;
		markdown = `${markdown}- Do not commit any changes to \`./cache\` directory. This feature helps to integrity of the records for visitors.\n`;
		markdown = `${markdown}- The app will automatically stop measuring insights until you revoke those commits.\n`;
		markdown = `${markdown}## 📦 Third party\n\n`;
		markdown = `${markdown}- [@octokit/rest](https://www.npmjs.com/package/@octokit/rest) - Send REST API requests to GitHub.\n`;
		markdown = `${markdown}- [fs-extra](https://www.npmjs.com/package/fs-extra) - Creating directories and files.\n`;
		markdown = `${markdown}- [simple-git](https://www.npmjs.com/package/simple-git) - Handling Git commands.\n`;
		markdown = `${markdown}- [node-chart-exec](https://www.npmjs.com/package/node-chart-exec) - Generate graphs.\n`;
		markdown = `${markdown}## 📄 License\n`;
		markdown = `${markdown}- Powered by: [${actionName}](${actionUrl})\n`;
		markdown = `${markdown}- Code: [MIT](./LICENSE) © [${authorName}](${authorUrl})\n`;
		markdown = `${markdown}- Data in the \`./cache\` directory: [Open Database License](https://opendatacommons.org/licenses/odbl/1-0/)`;
		return markdown;
	};
	const createSummaryPageTableComponent = async (fileName, response, insightsRepository) => {
		let table = "<table>\n";
		table = `${table}\t<tr>\n`;
		table = `${table}\t\t<th>\n`;
		table = `${table}\t\t\tRepository\n`;
		table = `${table}\t\t</th>\n`;
		table = `${table}\t\t<th>\n`;
		table = `${table}\t\t\tLast Updated\n`;
		table = `${table}\t\t</th>\n`;
		table = `${table}\t\t<th>\n`;
		table = `${table}\t\t\tUnique\n`;
		table = `${table}\t\t</th>\n`;
		table = `${table}\t\t<th>\n`;
		table = `${table}\t\t\tViews\n`;
		table = `${table}\t\t</th>\n`;
		table = `${table}\t</tr>\n`;
		for (const repository of response) {
			const repositoryUrl = `https://github.com/${repository.ownerLogin}/${insightsRepository}`;
			const readmeUrl = `${repositoryUrl}/tree/master/readme`;
			const graphUrl = `${repositoryUrl}/raw/master/graph`;
			const summaryCache = await recordSummaryFile.readSummaryCacheFile(repository.repositoryId);
			table = `${table}\t<tr>\n`;
			table = `${table}\t\t<td>\n`;
			table = `${table}\t\t\t<a href="${readmeUrl}/${repository.repositoryId}/${fileName}.md">\n`;
			table = `${table}\t\t\t\t${repository.repositoryName}\n`;
			table = `${table}\t\t\t</a>\n`;
			table = `${table}\t\t</td>\n`;
			table = `${table}\t\t<td>\n`;
			table = `${table}\t\t\t${formatDate(summaryCache.views.timestamp)}\n`;
			table = `${table}\t\t</td>\n`;
			table = `${table}\t\t<td>\n`;
			table = `${table}\t\t\t${summaryCache.views.summary.uniques}\n`;
			table = `${table}\t\t</td>\n`;
			table = `${table}\t\t<td>\n`;
			table = `${table}\t\t\t<img alt="Response time graph" src="${graphUrl}/${repository.repositoryId}/small/${fileName}.png" height="20"> ${summaryCache.views.summary.count}\n`;
			table = `${table}\t\t</td>\n`;
			table = `${table}\t</tr>\n`;
		}
		table = `${table}</table>\n\n`;
		return table;
	};
	const summaryPage = async (fileName, actionName, actionUrl, authorName, authorUrl, response, insightsRepository) => {
		const lastUpdate = getDate();
		const tableComponent = await createSummaryPageTableComponent(fileName, response, insightsRepository);
		const repositoryUrl = `https://github.com/${response[0].ownerLogin}/${insightsRepository}`;
		const svgBadge = `[![Image of ${repositoryUrl}](${repositoryUrl}/blob/master/svg/profile/badge.svg)](${repositoryUrl})`;
		let markdown = `## [🚀 ${actionName}](${actionUrl})\n`;
		markdown = `${markdown}**${actionName}** is an opensource project that powered entirely by  \`GitHub Actions\` to fetch and store insights of repositories.\n`;
		markdown = `${markdown}It uses \`GitHub API\` to fetch the insight data of your repositories and commits changes into a separate repository.\n\n`;
		markdown = `${markdown}The project created and maintained by [gayanvoice](https://github.com/gayanvoice). Don't forget to follow him on [GitHub](https://github.com/gayanvoice), [Twitter](https://twitter.com/gayanvoice), and [Medium](https://gayanvoice.medium.com/).\n\n`;
		markdown = `${markdown}${tableComponent}`;
		markdown = `${markdown}<small><i>Last updated on ${lastUpdate}</i></small>\n\n`;
		markdown = `${markdown}## ✂️Copy and 📋 Paste\n`;
		markdown = `${markdown}### Total Views Badge\n`;
		markdown = `${markdown}${svgBadge}\n\n`;
		markdown = `${markdown}\`\`\`readme\n`;
		markdown = `${markdown}${svgBadge}\n`;
		markdown = `${markdown}\`\`\`\n`;
		markdown = `${markdown}${footerComponent(actionName, actionUrl, authorName, authorUrl)}`;
		return markdown;
	};
	const menuComponent = (request, readmeUrl) => {
		if (request.advancedMode) {
			return `| [**Week →**](${readmeUrl}/week.md) | [**Month →**](${readmeUrl}/month.md) | [**Year →**](${readmeUrl}/year.md) |\n| ---- | ---- | ----- |\n`;
		}
		return "\n";
	};
	const createRepositoryPageTableComponent = (views) => {
		let table = "<table>\n";
		table = `${table}\t<tr>\n`;
		table = `${table}\t\t<th>\n`;
		table = `${table}\t\t\tLast Updated\n`;
		table = `${table}\t\t</th>\n`;
		table = `${table}\t\t<th>\n`;
		table = `${table}\t\t\tUnique\n`;
		table = `${table}\t\t</th>\n`;
		table = `${table}\t\t<th>\n`;
		table = `${table}\t\t\tCount\n`;
		table = `${table}\t\t</th>\n`;
		table = `${table}\t</tr>\n`;
		for (const view of views.reverse()) {
			table = `${table}\t<tr>\n`;
			table = `${table}\t\t<td>\n`;
			table = `${table}\t\t\t<code>${view.timestamp.getFullYear()}/${view.timestamp.getMonth() + 1}/${view.timestamp.getDate()}</code>\n`;
			table = `${table}\t\t</td>\n`;
			table = `${table}\t\t<td>\n`;
			table = `${table}\t\t\t<code>${view.uniques}</code>\n`;
			table = `${table}\t\t</td>\n`;
			table = `${table}\t\t<td>\n`;
			table = `${table}\t\t\t<code>${view.count}</code>\n`;
			table = `${table}\t\t</td>\n`;
			table = `${table}\t</tr>\n`;
		}
		table = `${table}</table>\n\n`;
		return table;
	};
	const repositoryPage = async (ACTION_NAME, ACTION_URL, AUTHOR_NAME, AUTHOR_URL, views, file, response, request) => {
		const insightsRepositoryUrl = `https://github.com/${response.ownerLogin}/${request.insightsRepository}`;
		const readmeUrl = `${insightsRepositoryUrl}/blob/master/readme/${response.repositoryId}`;
		const repositoryName = `[${response.repositoryName}](https://github.com/${response.ownerLogin}/${response.repositoryName})`;
		const chart = `![Image of ${request.insightsRepository}](${insightsRepositoryUrl}/blob/master/graph/${response.repositoryId}/large/${file.toLowerCase()}.png)`;
		const svgBadge = `[![Image of ${request.insightsRepository}](${insightsRepositoryUrl}/blob/master/svg/${response.repositoryId}/badge.svg)](${insightsRepositoryUrl}/blob/master/readme/${response.repositoryId}/week.md)`;
		let chartBadge;
		if (request.advancedMode) {
			chartBadge = `# ${response.repositoryName} [<img alt="Image of ${request.insightsRepository}" src="${insightsRepositoryUrl}/blob/master/graph/${response.repositoryId}/small/week.png" height="20">](${insightsRepositoryUrl}/blob/master/readme/${response.repositoryId}/week.md)`;
		} else {
			chartBadge = `# ${response.repositoryName} [<img alt="Image of ${request.insightsRepository}" src="${insightsRepositoryUrl}/blob/master/graph/${response.repositoryId}/small/year.png" height="20">](${insightsRepositoryUrl}/blob/master/readme/${response.repositoryId}/year.md)`;
		}
		let markdown = `## [🔙 ${request.insightsRepository}](${insightsRepositoryUrl})\n`;
		markdown = `${markdown}${menuComponent(request, readmeUrl)}`;
		markdown = `${markdown}### :octocat: ${repositoryName}\n`;
		markdown = `${markdown}${chart}\n\n`;
		markdown = `${markdown}<details>\n`;
		markdown = `${markdown}\t<summary>Click to expand table</summary>\n`;
		markdown = `${markdown}\t<h2>:calendar: ${file} Page Views Table</h2>\n`;
		markdown = `${markdown}${createRepositoryPageTableComponent(views)}`;
		markdown = `${markdown}</details>\n`;
		markdown = `${markdown}<small><i>Last updated on ${getDate()}</i></small>\n\n`;
		markdown = `${markdown}## ✂️Copy and 📋 Paste\n`;
		markdown = `${markdown}### SVG Badge\n`;
		markdown = `${markdown}${svgBadge}\n`;
		markdown = `${markdown}\`\`\`readme\n`;
		markdown = `${markdown}${svgBadge}\n`;
		markdown = `${markdown}\`\`\`\n`;
		markdown = `${markdown}### Header\n`;
		markdown = `${markdown}${chartBadge}\n`;
		markdown = `${markdown}\`\`\`readme\n`;
		markdown = `${markdown}${chartBadge}\n`;
		markdown = `${markdown}\`\`\`\n`;
		markdown = `${markdown}${footerComponent(ACTION_NAME, ACTION_URL, AUTHOR_NAME, ACTION_URL)}`;
		return markdown;
	};
	const createSummaryMarkDownTemplateAdvanced = async (response, repository) => {
		return await summaryPage("week", ACTION_NAME, ACTION_URL, AUTHOR_NAME, AUTHOR_URL, response, repository);
	};
	const createSummaryMarkDownTemplateBasic = async (response, repository) => {
		return await summaryPage("year", ACTION_NAME, ACTION_URL, AUTHOR_NAME, AUTHOR_URL, response, repository);
	};
	const createListMarkDownTemplate = async (views, file, response, request) => {
		return await repositoryPage(ACTION_NAME, ACTION_URL, AUTHOR_NAME, AUTHOR_URL, views, file, response, request);
	};
	return {
		createListMarkDownTemplate: createListMarkDownTemplate,
		createSummaryMarkDownTemplateAdvanced: createSummaryMarkDownTemplateAdvanced,
		createSummaryMarkDownTemplateBasic: createSummaryMarkDownTemplateBasic,
	};
})();

export default markdownTemplate;
