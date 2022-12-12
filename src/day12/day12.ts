import { cloneDeep } from "lodash";
import fileHandling from "../util/fileHandling";

type Position = {
  row: number;
  col: number;
};

type HeightIndex = {
  value: string;
  height: string;
  touched: boolean;
  stepNumber: number | undefined;
  position: Position;
};

function getHeight(value: string) {
  if (value === "E") return "z";
  if (value === "S") return "a";
  return value;
}

function createHeightIndex(
  value: string,
  row: number,
  col: number,
  isStart: boolean = false
): HeightIndex {
  return {
    value,
    height: getHeight(value),
    touched: isStart,
    stepNumber: isStart ? 0 : undefined,
    position: {
      row,
      col,
    },
  };
}

const steps: Position[] = [
  { row: 1, col: 0 },
  { row: -1, col: 0 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
];

function processIndex(
  heightMap: HeightIndex[][],
  heightIndexQueue: HeightIndex[],
  focusIndex: HeightIndex
) {
  const stepNumber = focusIndex.stepNumber! + 1;
  steps.forEach((step) => {
    const neighborPosition = {
      row: focusIndex.position.row + step.row,
      col: focusIndex.position.col + step.col,
    };
    if (
      neighborPosition.row >= 0 &&
      neighborPosition.row < heightMap.length &&
      neighborPosition.col >= 0 &&
      neighborPosition.col < heightMap[0].length
    ) {
      const neighborIndex =
        heightMap[neighborPosition.row][neighborPosition.col];
      if (
        focusIndex.height.charCodeAt(0) - neighborIndex.height.charCodeAt(0) <=
        1
      )
        if (!neighborIndex.touched) {
          neighborIndex.touched = true;
          neighborIndex.stepNumber = stepNumber;
          heightIndexQueue.unshift(neighborIndex);
        }
    }
  });
}

//BFS
function findNumSteps(
  heightMap: HeightIndex[][],
  startPosition: Position,
  endValue: string
) {
  const heightIndexQueue: HeightIndex[] = [
    heightMap[startPosition.row][startPosition.col],
  ];

  while (heightIndexQueue.length > 0) {
    const focusIndex = heightIndexQueue.pop()!;
    if (focusIndex.value === endValue) {
      return focusIndex.stepNumber;
    }
    processIndex(heightMap, heightIndexQueue, focusIndex);
  }
}

async function day12() {
  let startPosition: Position;
  const heightMap = (
    await fileHandling.pullDataFromFile("day12/input.txt")
  ).map((heightString, row) =>
    heightString.split("").map((value, col) => {
      if (value === "E") startPosition = { row, col };
      return createHeightIndex(value, row, col, value === "E");
    })
  );

  const stepsToS = findNumSteps(cloneDeep(heightMap), startPosition!, "S");
  const stepsToA = findNumSteps(cloneDeep(heightMap), startPosition!, "a");

  return { stepsToS, stepsToA };
}

export default day12;
