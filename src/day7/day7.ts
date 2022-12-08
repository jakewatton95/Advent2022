import { sumBy } from "lodash";
import fileHandling from "../util/fileHandling";

type FolderNode = {
  folderName: string;
  totalSize: number;
};

function parseData(cmds: string[]) {
  const stack: Array<FolderNode> = [];
  const folderSizes: Array<FolderNode> = [];
  for (let i = 0; i < cmds.length; i++) {
    const cmdArr = cmds[i].split(" ");
    if (cmdArr[0] === "$" && cmdArr[1] === "cd") {
      if (cmdArr[2] == "..") {
        const finishedFolder = stack.pop()!;
        stack[stack.length - 1].totalSize += finishedFolder.totalSize;
        folderSizes.push(finishedFolder);
      } else {
        stack.push({ folderName: cmdArr[2], totalSize: 0 });
      }
    } else {
      const fileSize = parseInt(cmdArr[0]);
      if (fileSize) {
        stack[stack.length - 1].totalSize += fileSize;
      }
    }
  }

  // stack may not be empty so make sure to get all the way through it adding to final folder sizes
  while (stack.length > 0) {
    const finishedFolder = stack.pop();
    folderSizes.push(finishedFolder!);
    if (stack.length)
      stack[stack.length - 1].totalSize += finishedFolder?.totalSize!;
  }
  return folderSizes;
}

async function day7() {
  const cmds = await fileHandling.pullDataFromFile("day7/input.txt");
  const folderSizes = parseData(cmds);
  const totalSmallFileSize = sumBy(
    folderSizes.filter((folder) => folder.totalSize < 100000),
    "totalSize"
  );

  // size of root is total size
  const totalSize = folderSizes[folderSizes.length - 1].totalSize;
  const freeSpace = 70000000 - totalSize;
  const spaceNeededToDelete = 30000000 - freeSpace;

  const deleteSizes = folderSizes
    .filter((f) => f.totalSize > spaceNeededToDelete)
    .map(({ totalSize }) => totalSize)
    .sort((a, b) => a - b);

  return { totalSmallFileSize, smallestDeleteSize: deleteSizes[0] };
}

export default day7;
