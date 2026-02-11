import simpleGit from "simple-git";

const git = (() => {
	const gitInstance = simpleGit();
	const pull = async () => {
		await gitInstance.pull();
	};
	const commit = async (username, email, message) => {
		await gitInstance.addConfig("user.name", username);
		await gitInstance.addConfig("user.email", email);
		await gitInstance.add("./*");
		await gitInstance.commit(message);
	};
	const push = async (branch) => {
		await gitInstance.push("origin", branch);
	};
	return {
		pull: pull,
		commit: commit,
		push: push,
	};
})();

export default git;
