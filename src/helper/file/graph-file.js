import { exec } from "node:child_process";
import { promisify } from "node:util";

const execPromise = promisify(exec);

const graphFile = (() => {
	const directory = "graph";
	const height = 400;
	const width = 400;
	const uniqueBorderColor = "#008bad";
	const uniqueBackgroundColor = "#00a1c1";
	const countBorderColor = "#00e7f2";
	const countBackgroundColor = "#00ffff";

	const execute = async (command) => {
		const { stdout, stderr } = await execPromise(command);
		if (stderr) {
			console.error(`error: ${stderr}`);
		}
		console.log(stdout);
	};
	const createGraphLargeFile = async (repository, fileName, graph) => {
		const path = `${directory}/${repository}/large/${fileName}.png`;
		const options = false;
		const command = `npx node-chart-exec@2.0.1 --type='line' --options='${options}' --height=${height} --width=${width} --labels='[${graph.labels}]' --dataset='[{"label":"Unique", "data":[${graph.uniqueData}], "backgroundColor":"${uniqueBackgroundColor}", "borderColor":"${uniqueBorderColor}"}, {"label":"Count", "data":[${graph.countData}], "backgroundColor":"${countBackgroundColor}", "borderColor":"${countBorderColor}"}]' --outputfile='${path}'`;
		await execute(command);
	};
	const createGraphSmallFile = async (repository, fileName, graph) => {
		const path = `${directory}/${repository}/small/${fileName}.png`;
		const options = true;
		const command = `npx node-chart-exec@2.0.1 --type='line' --options='${options}' --height=${height} --width=${width} --labels='[${graph.labels}]' --dataset='[{"label":"Unique", "data":[${graph.uniqueData}], "backgroundColor":"${uniqueBackgroundColor}", "borderColor":"${uniqueBorderColor}"}, {"label":"Count", "data":[${graph.countData}], "backgroundColor":"${countBackgroundColor}", "borderColor":"${countBorderColor}"}]' --outputfile='${path}'`;
		await execute(command);
	};
	const createGraphFile = async (repositoryId, fileName, graph) => {
		await createGraphLargeFile(repositoryId, fileName, graph);
		await createGraphSmallFile(repositoryId, fileName, graph);
	};
	return {
		createGraphFile: createGraphFile,
	};
})();

export default graphFile;
