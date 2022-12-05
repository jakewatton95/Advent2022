import fileHandling from "../util/fileHandling";
import stringUtil from "../util/stringUtil";

/* Note we can do this quick and easy in n^2 (per rucksack)  using last index of
   if we wanted to do it O(n) we could make a map of the chars in each and 
   check that the chars existed in both.
*/

/**
 * Uses ASCII code to get the priority value
 * @param item character representing an item
 * @returns priority value of the item
 */
function getPriority(item: string) {
  // lower case letters: a is ASCII code 97
  if (stringUtil.charIsLowerCase(item)) {
    return item.charCodeAt(0) - 96;
  }

  // upper case letters: A is ASCII code 65, but we have to add 26 for capitals
  return item.charCodeAt(0) - 64 + 26;
}

function getCombinedPriorityValues(rucksackData: string[]) {
  return rucksackData.reduce(
    (runningTotalPriorityCount: number, rucksack: string) => {
      let sharedPriorityCount = 0;
      const countedValues: string[] = [];
      for (let i = 0; i < rucksack.length / 2; i++) {
        if (
          rucksack.lastIndexOf(rucksack[i]) >= rucksack.length / 2 &&
          !countedValues.includes(rucksack[i])
        ) {
          countedValues.push(rucksack[i]);
          sharedPriorityCount += getPriority(rucksack[i]);
        }
      }
      return runningTotalPriorityCount + sharedPriorityCount;
    },
    0
  );
}

async function day3() {
  const rucksackData = await fileHandling.pullDataFromFile(
    "day3/day3Input.txt"
  );
  return getCombinedPriorityValues(rucksackData);
}

export default day3;
