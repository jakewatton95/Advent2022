import day1 from "./src/day1/day1.js";

async function main() {
  const { individualMax, top3Total } = await day1();
  console.log("Day 1 Calorie Question", individualMax);
  console.log("Day 1 Pt 2 Calorie Question", top3Total);
}

main().catch((e) => console.error(e));
