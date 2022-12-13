import type { Direction, Step, TreeGrid } from './types.ts';

export type Walk = (treeGrid: TreeGrid, rowOrColumnIndex: number) => Step[]

export const directionsToWalk: Record<Direction, Walk> = {
  down: (treeGrid, columnIndex) => treeGrid.map((row, rowIndex): Step => ({
    coordinate: [ rowIndex, columnIndex ],
    treeHeight: row[columnIndex]
  })),
  left: (treeGrid, rowIndex) => treeGrid[rowIndex].map((treeHeight, columnIndex): Step => ({
    coordinate: [ rowIndex, columnIndex ],
    treeHeight
  })).toReversed(),
  up: (treeGrid, columnIndex) => treeGrid.map((row, rowIndex): Step => ({
    coordinate: [ rowIndex, columnIndex ],
    treeHeight: row[columnIndex]
  })).toReversed(),
  right: (treeGrid, rowIndex) => treeGrid[rowIndex].map((treeHeight, columnIndex): Step => ({
    coordinate: [ rowIndex, columnIndex ],
    treeHeight
  }))
};

export const walkInDirectionThroughTrees = (
  direction: Direction,
  treeGrid: TreeGrid,
  rowOrColumnIndex: number
): Step[] =>
  directionsToWalk[direction](treeGrid, rowOrColumnIndex);
