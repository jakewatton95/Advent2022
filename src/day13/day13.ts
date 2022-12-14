import { isDeepStrictEqual } from "util";
import fileHandling from "../util/fileHandling";

const isRightOrder = (a: any, b: any): boolean | undefined => {
  if (a === b) return;
  if (a === undefined) return true;
  if (b === undefined) return false;
  if (typeof a === "number" && typeof b === "number") return a - b < 0;
  if (typeof a === "number") return isRightOrder([a], b);
  if (typeof b === "number") return isRightOrder(a, [b]);

  const len = Math.max(a.length, b.length);

  for (let i = 0; i < len; i++) {
    const val = isRightOrder(a[i], b[i]);
    if (val === undefined) continue;
    return val;
  }

  return undefined;
};
async function day13() {
  const packetPairs = (
    await fileHandling.pullDataFromFile("day13/input.txt", "\n\n")
  ).map((pairString) => pairString.split("\n").map((v) => JSON.parse(v)));

  console.log(packetPairs);

  const partOneTotal = packetPairs.reduce((total, pair, index) => {
    if (isRightOrder(pair[0], pair[1])) {
      return total + index + 1;
    }
    return total;
  }, 0);
  console.log(partOneTotal);

  const fullList = packetPairs.flat().concat([[[2]]], [[[6]]]);
  const sortedList = fullList.sort((a, b) => (isRightOrder(a, b) ? -1 : 1));
  const a = sortedList.findIndex((v) => isDeepStrictEqual(v, [[2]])) + 1;
  const b = sortedList.findIndex((v) => isDeepStrictEqual(v, [[6]])) + 1;

  console.log(a * b);
}

export default day13;
