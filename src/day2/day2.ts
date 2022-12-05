import fileHandling from "../util/fileHandling";
import mathUtil from "../util/mathUtil";

/* mapping the choices to values 0, 1, and 2 so we can use mod to determine the winner 
   when we need the value we should add 1 to this bc rock is 1, paper 2, scissors 3 
*/
const RPSMap = {
  A: 0,
  B: 1,
  C: 2,
  X: 0,
  Y: 1,
  Z: 2,
};

type OpponentOption = "A" | "B" | "C";
type UserOption = "X" | "Y" | "Z";

// for part 1
function determineGameOutcome(
  opponentChoice: OpponentOption,
  userChoice: UserOption
) {
  const opponentValue = RPSMap[opponentChoice];
  const userValue = RPSMap[userChoice];

  // tie
  if (opponentValue === userValue) {
    return 3 + (userValue + 1);
  }

  // user loss
  if (opponentValue === mathUtil.mod(userValue + 1, 3)) return userValue + 1;

  // all other outcomes are a user win
  return 6 + (userValue + 1);
}

// for part 2
function determineGameOutcomeUpdated(
  opponentChoice: OpponentOption,
  intendedResult: UserOption
) {
  const opponentValue = RPSMap[opponentChoice];

  // tie
  if (intendedResult === "Y") return 3 + (opponentValue + 1);

  // user win
  if (intendedResult === "Z") return 6 + mathUtil.mod(opponentValue + 1, 3) + 1;

  // all other outcomes are loss
  return mathUtil.mod(opponentValue - 1, 3) + 1;
}

function getTotalScore(
  rpsData: string[],
  getGameOutcome: (
    opponentChoice: OpponentOption,
    intendedResult: UserOption
  ) => number
) {
  return rpsData.reduce((runningScore, gameChoices) => {
    const opponentChoice = gameChoices[0] as OpponentOption;
    const userChoice = gameChoices[2] as UserOption;
    const gameResult = getGameOutcome(opponentChoice, userChoice);
    return runningScore + gameResult;
  }, 0);
}

async function day2() {
  const rpsData = await fileHandling.pullDataFromFile("day2/day2input.txt");
  // part 1
  const totalScore = getTotalScore(rpsData, determineGameOutcome);

  // part 2
  const totalScoreUpdated = getTotalScore(rpsData, determineGameOutcomeUpdated);
  return { totalScore, totalScoreUpdated };
}

export default day2;
