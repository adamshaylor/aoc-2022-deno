import type { Crate, Move, Stack } from './lib/types.ts';

import parseStacksString from './lib/parseStacksString.ts';
import parseMovesString from './lib/parseMovesString.ts';
import reportTopCrates from "./lib/reportTopCrates.ts";

const applyMovesToStacks = (stacks: Stack[], moves: Move[]): void => {
  for (const move of moves) {
    let [ quantity ] = move;
    const originIndex = move[1] - 1;
    const destinationIndex = move[2] - 1;

    while(quantity > 0 && stacks[originIndex].length) {
      // TypeScript needs some reassurance in spite of the length check
      const crate = stacks[originIndex].pop() as Crate;
      stacks[destinationIndex].push(crate);
      quantity -= 1;
    }
  }
};

const input = await Deno.readTextFile('day-5/input.txt');
const [ stacksString, movesString ] = input.trimEnd().split('\n\n');
const stacks = parseStacksString(stacksString);
const moves = parseMovesString(movesString);
applyMovesToStacks(stacks, moves);
console.log(reportTopCrates(stacks));
