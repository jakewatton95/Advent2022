import day1 from "./src/day1/day1";
import day2 from "./src/day2/day2";
import day3 from "./src/day3/day3";
import day4 from "./src/day4/day4";

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
}

main().catch((e) => console.error(e));
