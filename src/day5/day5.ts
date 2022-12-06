import { cloneDeep } from "lodash";
import fileHandling from "../util/fileHandling";

type Instruction = {
  moveCount: number;
  fromColumn: number;
  toColumn: number;
};

function parseRawStacks(initialStacks: string[]) {
  return initialStacks.reduce(
    (stacks: Record<number, string[]>, stackLine: string) => {
      for (let i = 0; i < stackLine.length; i += 4) {
        const stackNum = i / 4 + 1;
        const blockValue = stackLine[i + 1];
        if (blockValue !== " ") {
          stacks[stackNum] = stacks[stackNum]
            ? [blockValue, ...stacks[stackNum]]
            : [blockValue];
        }
      }
      return stacks;
    },
    {}
  );
}

function parseInstructions(instructions: string[]) {
  return instructions.map((instruction) => {
    const splitInstruction = instruction.split(" ");
    const moveCount = parseInt(splitInstruction[1]);
    const fromColumn = parseInt(splitInstruction[3]);
    const toColumn = parseInt(splitInstruction[5]);
    return {
      moveCount,
      fromColumn,
      toColumn,
    };
  });
}

// part 1
function performInstructions(
  instructions: Instruction[],
  stacks: Record<number, string[]>
) {
  instructions.forEach((instruction) => {
    const { moveCount, fromColumn, toColumn } = instruction;
    for (let i = 0; i < moveCount; i++) {
      const shiftingBlock = stacks[fromColumn].pop()!;
      stacks[toColumn].push(shiftingBlock);
    }
  });
  return stacks;
}

// part 2
function performInstructionsGrouped(
  instructions: Instruction[],
  stacks: Record<number, string[]>
) {
  instructions.forEach((instruction) => {
    const { moveCount, fromColumn, toColumn } = instruction;
    const movingBlocks = stacks[fromColumn].slice(-1 * moveCount);
    stacks[fromColumn] = stacks[fromColumn].slice(0, -1 * moveCount);
    stacks[toColumn] = [...stacks[toColumn], ...movingBlocks];
  });
  return stacks;
}

function getTopOfStacks(stacks: Record<number, string[]>) {
  return Object.keys(stacks)
    .sort()
    .map((columnNumber) => stacks[parseInt(columnNumber)].pop()!)
    .join("");
}

async function day5() {
  const blockData = await fileHandling.pullDataFromFile("day5/input.txt");
  const initialStacks = blockData.splice(0, blockData.indexOf("") - 1);
  const instructions = blockData.splice(blockData.indexOf("") + 1);
  const stacks: Record<number, string[]> = parseRawStacks(initialStacks);
  const parsedInstructions = parseInstructions(instructions);
  const stacksAfterInstructionsPartOne = performInstructions(
    parsedInstructions,
    cloneDeep(stacks)
  );
  const topItems = getTopOfStacks(stacksAfterInstructionsPartOne);

  const stacksAfterInstructionsPartTwo = performInstructionsGrouped(
    parsedInstructions,
    cloneDeep(stacks)
  );
  const topItemsGrouped = getTopOfStacks(stacksAfterInstructionsPartTwo);

  return { topItems, topItemsGrouped };
}

export default day5;
