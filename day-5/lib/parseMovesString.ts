import type { Move } from './types.ts';

const parseMovesString = (movesString: string): Move[] =>
  movesString
    .split('\n')
    .map(moveString =>
      moveString
        .replace('move ', '')
        .replace('from ', '')
        .replace('to ', '')
        .split(' ')
        .map(Number) as Move
    );

export default parseMovesString;
