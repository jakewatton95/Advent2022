import { uniqBy } from "lodash";
import fileHandling from "../util/fileHandling";

type Coordinate = {
  x: number;
  y: number;
};
const directionToCoordinate = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

type Movement = {
  direction: keyof typeof directionToCoordinate;
  distance: number;
};

function areCoordsTouching(a: Coordinate, b: Coordinate) {
  return Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;
}

function moveCoordinate(
  coordinate: Coordinate,
  direction: keyof typeof directionToCoordinate
) {
  return {
    x: coordinate.x + directionToCoordinate[direction].x,
    y: coordinate.y + directionToCoordinate[direction].y,
  };
}

function moveCoordATowardsCoordB(coordA: Coordinate, coordB: Coordinate) {
  const xDelta = coordB.x - coordA.x;
  const yDelta = coordB.y - coordA.y;

  const xmove = xDelta === 0 ? 0 : xDelta / Math.abs(xDelta);
  const ymove = yDelta === 0 ? 0 : yDelta / Math.abs(yDelta);

  return { x: coordA.x + xmove, y: coordA.y + ymove };
}

function processMovements(movements: Movement[], numKnots: number) {
  const tailTouchedCoords: Coordinate[] = [{ x: 0, y: 0 }];
  const knots: Coordinate[] = Array(numKnots).fill({ x: 0, y: 0 });

  movements.forEach((movement) => {
    const { direction, distance } = movement;
    for (let i = 0; i < distance; i++) {
      knots[0] = moveCoordinate(knots[0], direction);
      for (let j = 0; j < knots.length - 1; j++)
        if (!areCoordsTouching(knots[j], knots[j + 1])) {
          knots[j + 1] = moveCoordATowardsCoordB(knots[j + 1], knots[j]);
          if (j === knots.length - 2)
            tailTouchedCoords.push({ ...knots[knots.length - 1] });
        }
    }
  });

  return tailTouchedCoords;
}

async function day9() {
  const movements = (await fileHandling.pullDataFromFile("day9/input.txt")).map(
    (movementString) => {
      const [direction, distance] = movementString.split(" ");
      return {
        direction: direction as keyof typeof directionToCoordinate,
        distance: parseInt(distance),
      };
    }
  );
  const partOneTouchedCoords = uniqBy(processMovements(movements, 2), (coord) =>
    JSON.stringify(coord)
  );

  const partTwoTouchedCoords = uniqBy(
    processMovements(movements, 10),
    (coord) => JSON.stringify(coord)
  );
  return { p1: partOneTouchedCoords.length, p2: partTwoTouchedCoords.length };
}

export default day9;
