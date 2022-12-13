import type { Coordinate, Step } from './lib/types.ts';

import { directions } from './lib/constants.ts';
import parseTreeGrid from './lib/parseTreeGrid.ts';
import { walkInDirectionThroughTrees } from './lib/walk.ts';

const isHighestCumulativeTree = (step: Step, index: number, allSteps: Step[]): boolean => {
  const previousSteps = allSteps.slice(0, index);
  return previousSteps.every(previousStep => previousStep.treeHeight < step.treeHeight);
};

const coordinateIsEqualTo = (a: Coordinate) =>
  (b: Coordinate): boolean =>
    a[0] === b[0] &&
    a[1] === b[1];

const input = await Deno.readTextFile('day-8/input.txt');
const treeGrid = parseTreeGrid(input);
const rowCount = treeGrid.length;
const columnCount = treeGrid[0].length;

const visibleTreeCoordinates = directions
  .flatMap(direction =>
    direction === 'left' || direction === 'right'
      ? Array
          .from(
            { length: rowCount },
            (_, rowIndex) => walkInDirectionThroughTrees(direction, treeGrid, rowIndex)
              .filter(isHighestCumulativeTree)
              .map(step => step.coordinate)
          )
          .flat()
      : Array
          .from(
            { length: columnCount },
            (_, columnIndex) => walkInDirectionThroughTrees(direction, treeGrid, columnIndex)
              .filter(isHighestCumulativeTree)
              .map(step => step.coordinate)
          )
          .flat()
  )
  .reduce(
    (dedupedCoordinates, coordinate) =>
      dedupedCoordinates.some(coordinateIsEqualTo(coordinate))
        ? dedupedCoordinates
        : [ ...dedupedCoordinates, coordinate ],
    [] as Coordinate[]
  );

console.log(visibleTreeCoordinates.length);
