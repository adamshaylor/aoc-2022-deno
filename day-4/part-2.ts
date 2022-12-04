import type { CleaningAssignmentRange } from './lib/types.ts';

import inputToCleaningAssignmentPairs from './lib/inputToCleaningAssignmentPairs.ts';

const input = await Deno.readTextFile('day-4/input.txt');
const cleaningAssigmentPairs = inputToCleaningAssignmentPairs(input.trim());

const overlaps = (
  assignmentA: CleaningAssignmentRange,
  assignmentB: CleaningAssignmentRange
): boolean => {
  const [ aFirstId, aLastId ] = assignmentA;
  const [ bFirstId, bLastId ] = assignmentB;
  return aFirstId >= bFirstId && aFirstId <= bLastId ||
    bFirstId >= aFirstId && bFirstId <= aLastId;
};

const overlappingPairCount = cleaningAssigmentPairs.reduce(
  (count, [ firstRange, secondRange ]) =>
    overlaps(firstRange, secondRange)
      ? count + 1
      : count,
  0
);

console.log(overlappingPairCount);
