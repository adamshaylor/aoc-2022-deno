import type { Stack } from './types.ts';

const reportTopCrates = (stacks: Stack[]): string =>
  stacks
    .map(stack => stack.slice(-1) || ' ')
    .join('');

export default reportTopCrates;
