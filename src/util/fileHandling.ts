import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const srcDirname = __dirname.substring(0, __dirname.lastIndexOf("/"));

/**
 *
 * @param filePathFromSource - string that represents file path after ...src/ i.e. "day1/day1input.txt"
 * @returns array of file data split by line
 */
async function pullDataFromFile(
  filePathFromSource: string,
  splitOperation: string = "\n"
) {
  const data = await readFile(`${srcDirname}/${filePathFromSource}`, {
    encoding: "utf8",
  });
  return data.split(splitOperation);
}

export default {
  pullDataFromFile,
};
