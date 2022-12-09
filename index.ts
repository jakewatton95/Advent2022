import day1 from "./src/day1/day1";
import day2 from "./src/day2/day2";
import day3 from "./src/day3/day3";
import day4 from "./src/day4/day4";
import day5 from "./src/day5/day5";
import day6 from "./src/day6/day6";
import day7 from "./src/day7/day7";
import day8 from "./src/day8/day8";

async function main() {
  const { individualMax, top3Total } = await day1();
  console.log("Day 1 Calorie Question", individualMax);
  console.log("Day 1 Pt 2 Calorie Question", top3Total);

  const { totalScore, totalScoreUpdated } = await day2();
  console.log("Day 2 RPS score", totalScore);
  console.log("Day 2 Updated RPS score", totalScoreUpdated);

  const { badgePriorityValues, combinedPriorityValues } = await day3();
  console.log("Day 3 total rucksack priority value:", combinedPriorityValues);
  console.log("Day 3 total rucksack badge value:", badgePriorityValues);

  const { anyOverlaps, fullOverlaps } = await day4();
  console.log("Day 4 full overlap count", fullOverlaps);
  console.log("Day 4 partial overlap count", anyOverlaps);

  const { topItems, topItemsGrouped } = await day5();
  console.log("Day 5 Items on top of stacks", topItems);
  console.log(
    "Day 5 Items on top of stacks when moved in groups",
    topItemsGrouped
  );

  const { messageIndex, startIndex } = await day6();
  console.log("Day 6 start index", startIndex);
  console.log("Day 6 Message Index", messageIndex);

  const { smallestDeleteSize, totalSmallFileSize } = await day7();
  console.log("Day 7 file total", totalSmallFileSize);
  console.log("Day 7 smallest delete size", smallestDeleteSize);

  const { numVisibleTrees, maxVis } = await day8();
  console.log("Day 8 visible trees", numVisibleTrees);
  console.log("Day 8 max visibility", maxVis);
}

main().catch((e) => console.error(e));
