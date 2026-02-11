import * as core from "@actions/core";
import fs from "fs-extra";
import CacheFileModel from "../model/file/CacheFileModel.js";
import ConfigFileModel from "../model/file/ConfigFileModel.js";
import SummaryFileModel from "../model/file/SummaryFileModel.js";

const file = (() => {
	const saveJson = async (fileName, jsonObject) => {
		try {
			await fs.outputJson(fileName, jsonObject);
			core.info(`Json file has been updated at ${fileName}`);
		} catch (error) {
			core.info(`Json file has not been updated at ${fileName}`);
		}
	};
	const saveOther = async (fileName, object) => {
		try {
			await fs.outputFile(fileName, object);
			core.info(`Other file has been updated at ${fileName}`);
		} catch (error) {
			core.info(`Other file has not been updated at ${fileName}`);
		}
	};
	const readCacheJson = async (fileName) => {
		try {
			const file = await fs.readJson(fileName);
			return new CacheFileModel(true, file);
		} catch (error) {
			return new CacheFileModel(false);
		}
	};
	const readConfigJson = async (fileName) => {
		try {
			const file = await fs.readJson(fileName);
			return new ConfigFileModel(true, file);
		} catch (error) {
			return new ConfigFileModel(false);
		}
	};
	const readSummaryJson = async (fileName) => {
		try {
			const file = await fs.readJson(fileName);
			return new SummaryFileModel(true, file);
		} catch (error) {
			return new SummaryFileModel(false);
		}
	};
	const createJsonFile = async (fileName, jsonObject) => {
		await saveJson(fileName, jsonObject);
	};
	const createOtherFile = async (fileName, object) => {
		await saveOther(fileName, object);
	};
	const readConfigFile = async (fileName) => {
		return await readConfigJson(fileName);
	};
	const readCacheFile = async (fileName) => {
		return await readCacheJson(fileName);
	};
	const readSummaryFile = async (fileName) => {
		return await readSummaryJson(fileName);
	};
	return {
		createJsonFile: createJsonFile,
		createOtherFile: createOtherFile,
		readCacheFile: readCacheFile,
		readConfigFile: readConfigFile,
		readSummaryFile: readSummaryFile,
	};
})();

export default file;
