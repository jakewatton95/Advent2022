import fileHandling from "../util/fileHandling";

type Interval = {
  start: number;
  end: number;
};

// pt 1
function hasFullOverlap(intervalA: Interval, intervalB: Interval) {
  if (intervalA.start <= intervalB.start && intervalA.end >= intervalB.end)
    return true;
  if (intervalB.start <= intervalA.start && intervalB.end >= intervalA.end)
    return true;
  return false;
}

// pt 2
function hasAnyOverlap(intervalA: Interval, intervalB: Interval) {
  if (intervalA.start >= intervalB.start && intervalA.start <= intervalB.end)
    return true;
  if (intervalB.start >= intervalA.start && intervalB.start <= intervalA.end)
    return true;
  return false;
}

function findOverlaps(assignmentData: Interval[][], fullOverlap: boolean) {
  const overlapFunction = fullOverlap ? hasFullOverlap : hasAnyOverlap;
  return assignmentData.reduce((totalCount: number, intervals: Interval[]) => {
    if (overlapFunction(intervals[0], intervals[1])) {
      return totalCount + 1;
    }
    return totalCount;
  }, 0);
}

async function day4() {
  const assignmentData = await fileHandling.pullDataFromFile("day4/input.txt");
  const parsedAssignmentData = assignmentData.map((assignmentString) => {
    return assignmentString.split(",").map((intervalString) => {
      const [start, end] = intervalString.split("-");
      return { start: parseInt(start), end: parseInt(end) };
    });
  });
  return {
    fullOverlaps: findOverlaps(parsedAssignmentData, true),
    anyOverlaps: findOverlaps(parsedAssignmentData, false),
  };
}

export default day4;
