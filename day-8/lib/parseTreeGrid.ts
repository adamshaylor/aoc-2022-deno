import type { TreeGrid } from './types.ts';

const parseTreeGrid = (input: string): TreeGrid =>
  input
    .trim()
    .split('\n')
    .map(line =>
      line
        .split('')
        .map(Number)
    );

export default parseTreeGrid;
