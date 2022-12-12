import fileHandling from "../util/fileHandling";

type Monkey = {
  items: number[];
  operation: (old: number) => number;
  testValue: number;
  trueIndex: number;
  falseIndex: number;
  itemsTouched: number;
};

function createOperation(
  operationString: string,
  secondValue: string,
  stressReliefValue: number
) {
  if (secondValue === "old") {
    if (operationString === "+")
      return (old: number) => Math.floor((old + old) / stressReliefValue);
    return (old: number) => Math.floor((old * old) / stressReliefValue);
  }
  if (operationString === "+")
    return (old: number) =>
      Math.floor((old + parseInt(secondValue)) / stressReliefValue);
  return (old: number) =>
    Math.floor((old * parseInt(secondValue)) / stressReliefValue);
}

function createMonkey(
  monkeyString: string,
  stressReliefValue: number = 1
): Monkey {
  const monkeyLines = monkeyString.split("\n");
  const items = monkeyLines[1]
    .split(":")[1]
    .split(",")
    .map((value) => parseInt(value.replace(" ", "")));

  const operationWords = monkeyLines[2].split(" ");
  const operationString = operationWords[operationWords.length - 2];
  const secondValue = operationWords[operationWords.length - 1];
  const operation = createOperation(
    operationString,
    secondValue,
    stressReliefValue
  );

  const testWords = monkeyLines[3].split(" ");
  const testValue = parseInt(testWords[testWords.length - 1]);

  const trueWords = monkeyLines[4].split(" ");
  const trueIndex = parseInt(trueWords[trueWords.length - 1]);
  const falseWords = monkeyLines[5].split(" ");
  const falseIndex = parseInt(falseWords[falseWords.length - 1]);
  return {
    items,
    operation,
    testValue,
    trueIndex,
    falseIndex,
    itemsTouched: 0,
  };
}

function processRounds(numRounds: number, monkeyList: Monkey[]) {
  const numberSystemValue = monkeyList
    .map((m) => m.testValue)
    .reduce((product, val) => val * product, 1);
  for (let i = 0; i < numRounds; i++) {
    monkeyList.forEach((monkey) => {
      monkey.itemsTouched += monkey.items.length;
      monkey.items.forEach((item) => {
        const inspectedItem = monkey.operation(item) % numberSystemValue;
        const passToIndex =
          inspectedItem % monkey.testValue === 0
            ? monkey.trueIndex
            : monkey.falseIndex;
        monkeyList[passToIndex].items.push(inspectedItem);
      });
      monkey.items = [];
    });
  }
}

async function day11() {
  const monkeys = await fileHandling.pullDataFromFile(
    "day11/input.txt",
    "\n\n"
  );

  const parsedMonkeys = monkeys.map((monkeyString) =>
    createMonkey(monkeyString, 3)
  );
  processRounds(20, parsedMonkeys);
  const touchedItemValues = parsedMonkeys
    .map((monkey) => monkey.itemsTouched)
    .sort((a, b) => b - a);
  const touchedItemProduct = touchedItemValues[0] * touchedItemValues[1];

  const pt2ParsedMonkeys = monkeys.map((monkeyString) =>
    createMonkey(monkeyString)
  );
  processRounds(10000, pt2ParsedMonkeys);
  console.log(pt2ParsedMonkeys);
  const touchedItemValues2 = pt2ParsedMonkeys
    .map((monkey) => monkey.itemsTouched)
    .sort((a, b) => b - a);
  const touchedItemProduct2 = touchedItemValues2[0] * touchedItemValues2[1];

  return { touchedItemProduct, touchedItemProduct2 };
}

export default day11;
