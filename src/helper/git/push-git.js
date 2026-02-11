import * as core from "@actions/core";
import git from "../../core/git.js";

const pushGit = (() => {
	const BRANCH = "master";
	const push = async () => {
		core.info("Git Push");
		try {
			await git.push(BRANCH);
		} catch (error) {
			core.info(error);
		}
	};
	return {
		push: push,
	};
})();

export default pushGit;
