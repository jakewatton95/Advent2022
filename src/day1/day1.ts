import fileHandling from "../util/fileHandling";

function getMax(calorieArray: string[]) {
  let max = 0;
  let running_max = 0;
  for (let i = 0; i < calorieArray.length; i++) {
    if (calorieArray[i].length === 0) {
      max = Math.max(max, running_max);
      running_max = 0;
    } else {
      running_max += parseInt(calorieArray[i]);
    }
  }
  return max;
}

function getTop3(calorieArray: string[]) {
  let top3 = [0, 0, 0];
  let running_max = 0;
  for (let i = 0; i < calorieArray.length; i++) {
    if (calorieArray[i].length === 0) {
      const min = Math.min(...top3, running_max);
      top3[top3.indexOf(min)] = running_max;
      running_max = 0;
    } else {
      running_max += parseInt(calorieArray[i]);
    }
  }
  return top3[0] + top3[1] + top3[2];
}

async function day1() {
  const calorieData = await fileHandling.pullDataFromFile("day1/day1input.txt");
  const individualMax = getMax(calorieData);
  const top3Total = getTop3(calorieData);
  return { individualMax, top3Total };
}

export default day1;
