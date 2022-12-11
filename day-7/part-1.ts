import type { TerminalLine } from './lib/parseTerminalLines.ts';

import { parseTerminalLines } from './lib/parseTerminalLines.ts';
import { createEmptyRoot, getPathsToSizes } from './lib/directoryUtilities.ts';
import sum from '../lib/sum.ts'

const sizeCeiling = 100000;

const input = await Deno.readTextFile('day-7/input.txt');
// Assume the first line is "cd /"
const [ , ...terminalLines ] = input.trim().split('\n') as TerminalLine[];

const directoryStructureFromTerminal = parseTerminalLines(createEmptyRoot(), [], terminalLines);
const pathsToSizes = getPathsToSizes(directoryStructureFromTerminal);

const sizesOfDirectoriesAtOrBelowCeiling = Object
  .values(pathsToSizes)
  .filter(size => size <= sizeCeiling);
const sumOfDirectoriesAtOrBelowCeiling = sum(sizesOfDirectoriesAtOrBelowCeiling);

console.log(sumOfDirectoriesAtOrBelowCeiling);
