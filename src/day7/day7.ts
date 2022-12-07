import { sum } from "lodash";
import fileHandling from "../util/fileHandling";

type FolderNode = {
  folderName: string;
  sum: number;
};

function parseData(cmds: string[]) {
  const stack: Array<FolderNode> = [];
  const folderSizes: Array<FolderNode> = [];
  for (let i = 0; i < cmds.length; i++) {
    const cmdArr = cmds[i].split(" ");
    if (cmdArr[0] === "$" && cmdArr[1] === "cd") {
      if (cmdArr[2] == "..") {
        const finishedFolder = stack.pop();
        stack[stack.length - 1].sum += finishedFolder?.sum!;
        folderSizes.push(finishedFolder!);
      } else {
        stack.push({ folderName: cmdArr[2], sum: 0 });
      }
    } else {
      const fileSize = parseInt(cmdArr[0]);
      if (fileSize) {
        stack[stack.length - 1].sum += fileSize;
      }
    }
  }
  while (stack.length > 0) {
    const finishedFolder = stack.pop();
    folderSizes.push(finishedFolder!);
    if (stack.length) stack[stack.length - 1].sum += finishedFolder?.sum!;
  }
  return folderSizes;
}

async function day7() {
  const cmds = await fileHandling.pullDataFromFile("day7/input.txt");
  const folderSizes = parseData(cmds);
  const totalSmallFileSize = sum(
    folderSizes.filter((folder) => folder.sum < 100000).map((f) => f.sum)
  );

  // size of root is total size
  const totalSize = folderSizes[folderSizes.length - 1].sum;
  const freeSpace = 70000000 - totalSize;
  const spaceNeededToDelete = 30000000 - freeSpace;

  const deleteSizes = folderSizes
    .filter((f) => f.sum > spaceNeededToDelete)
    .map(({ sum }) => sum)
    .sort((a, b) => a - b);

  return { totalSmallFileSize, smallestDeleteSize: deleteSizes[0] };
}

export default day7;
