import type { Move, Stack } from './lib/types.ts';

import parseStacksString from './lib/parseStacksString.ts';
import parseMovesString from './lib/parseMovesString.ts';
import reportTopCrates from "./lib/reportTopCrates.ts";

const getNewStacksFromMove = (stacks: Stack[], move: Move): Stack[] => {
  const [ quantity ] = move;
  const originStack = stacks[move[1] - 1];
  const destinationStack = stacks[move[2] - 1];
  return stacks.map((stack): Stack => {
    if (stack === originStack) {
      return stack.slice(0, quantity * -1);
    }
    if (stack === destinationStack) {
      return [ ...destinationStack, ...originStack.slice( quantity * -1) ]
    }
    return stack;
  });
};

const input = await Deno.readTextFile('day-5/input.txt');
const [ stacksString, movesString ] = input.trimEnd().split('\n\n');
const originalStacks = parseStacksString(stacksString);
const moves = parseMovesString(movesString);
const rearrangedStacks = moves.reduce(getNewStacksFromMove, originalStacks);
console.log(reportTopCrates(rearrangedStacks));
