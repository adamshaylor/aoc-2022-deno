import type { CleaningAssignmentRange } from './lib/types.ts';

import inputToCleaningAssignmentPairs from './lib/inputToCleaningAssignmentPairs.ts';

const input = await Deno.readTextFile('day-4/input.txt');
const cleaningAssigmentPairs = inputToCleaningAssignmentPairs(input.trim());

/**
 * Returns `true` if either `assignmentA` fully contains `assignmentB`
 * or vice versa.
 */
const fullyContains = (
  assignmentA: CleaningAssignmentRange,
  assignmentB: CleaningAssignmentRange
): boolean => {
  const [ aFirstId, aLastId ] = assignmentA;
  const [ bFirstId, bLastId ] = assignmentB;
  const aFullyContainsB = aFirstId <= bFirstId && aLastId >= bLastId;
  if (aFullyContainsB) {
    return true;
  }
  const bFullyContainsA = bFirstId <= aFirstId && bLastId >= aLastId;
  return bFullyContainsA;
};

const fullyContainingPairCount = cleaningAssigmentPairs.reduce(
  (count, [ firstRange, secondRange ]) =>
    fullyContains(firstRange, secondRange)
      ? count + 1
      : count,
  0
);

console.log(fullyContainingPairCount);
