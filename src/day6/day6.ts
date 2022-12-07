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

/**
 * Do it in O(n)
 */
function findFirstSetOfUniqueOn(packet: string, numDistinctCharacters: number) {
  const charMap: Record<string, boolean> = {};
  let startIndex = 0;
  let endIndex = 0;
  for (let i = 0; i < packet.length; i++) {
    endIndex++;
    if (!charMap[packet[i]]) {
      charMap[packet[i]] = true;
    } else {
      for (let j = startIndex; j < endIndex; j++) {
        startIndex++;
        if (packet[j] === packet[i]) {
          break;
        } else {
          charMap[packet[j]] = false;
        }
      }
    }
    if (endIndex - startIndex === numDistinctCharacters) return endIndex;
  }
}

async function day6() {
  const [packetData] = await fileHandling.pullDataFromFile("day6/input.txt");
  const startIndex = findFirstSetOfUnique(packetData, 4);
  const messageIndex = findFirstSetOfUnique(packetData, 14);
  return { startIndex, messageIndex };
}

export default day6;
