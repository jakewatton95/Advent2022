import fileHandling from "../util/fileHandling";

function findFirstSetOfUnique(packet: string, numDistinctCharacters: number) {
  let runningUniqueArray: string[] = [];
  for (let i = 0; i < packet.length; i++) {
    const index = runningUniqueArray.indexOf(packet[i]);
    if (index === -1) {
      runningUniqueArray.push(packet[i]);
      if (runningUniqueArray.length === numDistinctCharacters) return i + 1;
    } else {
      runningUniqueArray = [...runningUniqueArray.slice(index + 1), packet[i]];
    }
  }
}

async function day6() {
  const [packetData] = await fileHandling.pullDataFromFile("day6/input.txt");
  const startIndex = findFirstSetOfUnique(packetData, 4);
  const messageIndex = findFirstSetOfUnique(packetData, 14);
  return { startIndex, messageIndex };
}

export default day6;
