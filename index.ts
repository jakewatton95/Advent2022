import day1 from "./src/day1/day1";
import day2 from "./src/day2/day2";

async function main() {
  const { individualMax, top3Total } = await day1();
  console.log("Day 1 Calorie Question", individualMax);
  console.log("Day 1 Pt 2 Calorie Question", top3Total);

  const { totalScore, totalScoreUpdated } = await day2();
  console.log("Day 2 RPS score", totalScore);
  console.log("Day 2 Updated RPS score", totalScoreUpdated);
}

main().catch((e) => console.error(e));
