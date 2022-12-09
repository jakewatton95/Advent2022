import { max } from "lodash";
import fileHandling from "../util/fileHandling";

type TreeHeight = {
  height: number;
  visible: boolean;
  left: number;
  right: number;
  up: number;
  down: number;
};

function parseTreeLines(treeLines: TreeHeight[][]) {
  treeLines.forEach((line, i) => {
    let visibleMinLR = -1;
    let visibleMinRL = -1;
    for (let j = 0; j < line.length; j++) {
      // left edge visibility
      if (line[j].height > visibleMinLR) {
        treeLines[i][j].visible = true;
        visibleMinLR = line[j].height;
      }

      // get left distance score
      if (j === 0) treeLines[i][j].left = 0;
      else {
        treeLines[i][j].left = 1;
        for (let viewDistance = j - 1; viewDistance > 0; viewDistance--) {
          if (line[j].height > line[viewDistance].height) {
            treeLines[i][j].left++;
          } else {
            break;
          }
        }
      }

      // right edge visibility
      const reverseIndex = line.length - j - 1;
      if (line[reverseIndex].height > visibleMinRL) {
        treeLines[i][reverseIndex].visible = true;
        visibleMinRL = line[reverseIndex].height;
      }

      // get right score
      if (j === 0) treeLines[i][reverseIndex].right = 0;
      else {
        treeLines[i][reverseIndex].right = 1;

        for (
          let viewDistance = reverseIndex + 1;
          viewDistance < line.length - 1;
          viewDistance++
        ) {
          if (line[reverseIndex].height > line[viewDistance].height) {
            treeLines[i][reverseIndex].right++;
          } else {
            break;
          }
        }
      }
    }
  });

  for (let i = 0; i < treeLines[0].length; i++) {
    let visibleMinUD = -1;
    let visibleMinDU = -1;
    for (let j = 0; j < treeLines.length; j++) {
      // top edge visibility
      if (treeLines[j][i].height > visibleMinUD) {
        treeLines[j][i].visible = true;
        visibleMinUD = treeLines[j][i].height;
      }

      // get up score
      if (j === 0) treeLines[j][i].up = 0;
      else {
        treeLines[j][i].up = 1;

        for (let viewDistance = j - 1; viewDistance > 0; viewDistance--) {
          if (treeLines[j][i].height > treeLines[viewDistance][i].height) {
            treeLines[j][i].up++;
          } else {
            break;
          }
        }
      }

      // bottom edge visibility
      const reverseIndex = treeLines.length - j - 1;
      if (treeLines[reverseIndex][i].height > visibleMinDU) {
        treeLines[reverseIndex][i].visible = true;
        visibleMinDU = treeLines[reverseIndex][i].height;
      }

      // get down score
      if (j === 0) treeLines[reverseIndex][i].down = 0;
      else {
        treeLines[reverseIndex][i].down = 1;

        for (
          let viewDistance = reverseIndex + 1;
          viewDistance < treeLines.length - 1;
          viewDistance++
        ) {
          if (
            treeLines[reverseIndex][i].height >
            treeLines[viewDistance][i].height
          ) {
            treeLines[reverseIndex][i].down++;
          } else {
            break;
          }
        }
      }
    }
  }
  return treeLines;
}

async function day8() {
  const treeLines = await fileHandling.pullDataFromFile("day8/input.txt");
  const parsedTreeLines = parseTreeLines(
    treeLines.map((tL) =>
      tL.split("").map((height) => ({
        height: parseInt(height),
        visible: false,
        left: 0,
        right: 0,
        up: 0,
        down: 0,
      }))
    )
  );
  const numVisibleTrees = parsedTreeLines.reduce((visibleCount, treeLine) => {
    return visibleCount + treeLine.filter((tree) => tree.visible).length;
  }, 0);

  const maxVis = max(
    parsedTreeLines.flatMap((row) =>
      row.map((tree) => tree.down * tree.left * tree.right * tree.up)
    )
  );

  return { numVisibleTrees, maxVis };
}

day8();

export default day8;
