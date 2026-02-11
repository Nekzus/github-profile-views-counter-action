import * as core from "@actions/core";
import git from "../../core/git.js";

const commitGit = (() => {
	const INSIGHT_BOT_USERNAME = "github-actions[bot]";
	const INSIGHT_BOT_EMAIL = "41898282+github-actions[bot]@users.noreply.github.com";
	const commit = async (message) => {
		core.info(`Git Commit ${message}`);
		try {
			await git.commit(INSIGHT_BOT_USERNAME, INSIGHT_BOT_EMAIL, message);
		} catch (error) {
			core.info(error);
		}
	};
	return {
		commit: commit,
	};
})();

export default commitGit;
