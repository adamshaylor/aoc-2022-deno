import type {
  Coordinate,
  Direction,
  Step,
  TreeGrid
} from './lib/types.ts';

import { walkInDirectionThroughTrees } from './lib/walk.ts';
import parseTreeGrid from './lib/parseTreeGrid.ts';
import { directions } from './lib/constants.ts';
import product from '../lib/product.ts';

type OriginWalkFilter = (origin: Coordinate) =>
  (step: Step, index: number, allSteps: Step[]) =>
    boolean

const directionsToOriginWalkFilters: Record<Direction, OriginWalkFilter> = {
  up: origin => step => {
    const [ originRowIndex, originColumnIndex ] = origin;
    const [ stepRowIndex, stepColumnIndex ] = step.coordinate;
    return originColumnIndex === stepColumnIndex &&
      originRowIndex > stepRowIndex;
  },
  right: origin => step => {
    const [ originRowIndex, originColumnIndex ] = origin;
    const [ stepRowIndex, stepColumnIndex ] = step.coordinate;
    return originRowIndex === stepRowIndex &&
      originColumnIndex < stepColumnIndex;
  },
  down: origin => step => {
    const [ originRowIndex, originColumnIndex ] = origin;
    const [ stepRowIndex, stepColumnIndex ] = step.coordinate;
    return originColumnIndex === stepColumnIndex &&
      originRowIndex < stepRowIndex;
  },
  left: origin => step => {
    const [ originRowIndex, originColumnIndex ] = origin;
    const [ stepRowIndex, stepColumnIndex ] = step.coordinate;
    return originRowIndex === stepRowIndex &&
      originColumnIndex > stepColumnIndex;
  },
};

const walkInDirectionFromOrigin = (
  treeGrid: TreeGrid,
  origin: Coordinate,
  direction: Direction
): Step[] => {
  const rowOrColumnIndex = direction === 'left' || direction === 'right'
    ? origin[0]
    : origin[1];

  return walkInDirectionThroughTrees(direction, treeGrid, rowOrColumnIndex)
    .filter(directionsToOriginWalkFilters[direction](origin));
};

const scoreViewInDirection = (
  treeGrid: TreeGrid,
  origin: Coordinate,
  direction: Direction
): number => {
  const originHeight = treeGrid[origin[0]][origin[1]];
  const walk = walkInDirectionFromOrigin(treeGrid, origin, direction);
  const firstStepAsTallAsOrigin = walk.findIndex(step =>
    step.treeHeight >= originHeight
  );
  return firstStepAsTallAsOrigin >= 0
    ? firstStepAsTallAsOrigin + 1
    : walk.length;
};

const scoreViewAtCoordinate = (treeGrid: TreeGrid, coordinate: Coordinate): number => {
  const directionScores = directions.map(direction =>
    scoreViewInDirection(treeGrid, coordinate, direction)
  );
  return product(directionScores);
};

const input = await Deno.readTextFile('./day-8/input.txt');
const treeGrid = parseTreeGrid(input);

const allScores = treeGrid.flatMap((row, rowIndex) =>
  row.map((_, columnIndex) =>
    scoreViewAtCoordinate(treeGrid, [ rowIndex, columnIndex ])
  )
);

const highestScore = Math.max(...allScores);
console.log(highestScore);
