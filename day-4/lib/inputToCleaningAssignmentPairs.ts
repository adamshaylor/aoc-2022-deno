import type { CleaningAssignmentPair } from './types.ts';

const inputToCleaningAssignmentPairs = (input: string): CleaningAssignmentPair[] =>
  input
    .trim()
    .split('\n')
    .map(pairString =>
      pairString
        .split(',')
        .map(rangeString =>
          rangeString
            .split('-')
            .map(Number)
        )
    ) as CleaningAssignmentPair[];

export default inputToCleaningAssignmentPairs
