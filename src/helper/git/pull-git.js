import * as core from "@actions/core";
import git from "../../core/git.js";

const pullGit = (() => {
	const pull = async () => {
		core.info("Git Pull");
		try {
			await git.pull();
		} catch (error) {
			core.info(error);
		}
	};
	return {
		pull: pull,
	};
})();

export default pullGit;
