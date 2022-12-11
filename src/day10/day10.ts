import fileHandling from "../util/fileHandling";

type Operation =
  | {
      op: "noop";
    }
  | {
      op: "addx";
      value: number;
    };

function processOperations(operations: Operation[]) {
  const endOfCycleValues: number[] = [];
  let runningValue = 1;
  operations.forEach((operation) => {
    if (operation.op === "noop") {
      endOfCycleValues.push(runningValue);
    } else {
      endOfCycleValues.push(runningValue);
      runningValue += operation.value;
      endOfCycleValues.push(runningValue);
    }
  });
  return endOfCycleValues;
}

async function day10() {
  const operations = (
    await fileHandling.pullDataFromFile("day10/input.txt")
  ).map((operation) => {
    const splitOp = operation.split(" ");
    if (splitOp[0] === "noop") {
      return { op: "noop" as const };
    } else {
      return { op: "addx" as const, value: parseInt(splitOp[1]) };
    }
  });

  // during 20th cycle = end of 19th cycle = 18th index (-2)
  const cycles = [20, 60, 100, 140, 180, 220];
  const endOfCycleValues = processOperations(operations);

  const writtenPixels: boolean[] = [true];
  endOfCycleValues.forEach((cycleValue, i) => {
    if (Math.abs(cycleValue - ((i + 1) % 40)) <= 1) {
      writtenPixels.push(true);
    } else {
      writtenPixels.push(false);
    }
  });

  const signalStrength = cycles.reduce(
    (totalStrength, cycle) =>
      totalStrength + cycle * endOfCycleValues[cycle - 2],
    0
  );

  writtenPixels.forEach((pixel, i) => {
    if (pixel) process.stdout.write("*");
    else process.stdout.write(".");
    if ((i + 1) % 40 === 0) {
      process.stdout.write("\n");
    }
  });

  return { signalStrength };
}

export default day10;
