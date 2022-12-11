import type { TerminalLine } from './lib/parseTerminalLines.ts';

import { parseTerminalLines } from './lib/parseTerminalLines.ts';
import { createEmptyRoot, getPathsToSizes } from './lib/directoryUtilities.ts';

const diskSize = 70000000;
const sizeNeed = 30000000;

const input = await Deno.readTextFile('day-7/input.txt');
// Assume the first line is "cd /"
const [ , ...terminalLines ] = input.trim().split('\n') as TerminalLine[];

const directoryStructureFromTerminal = parseTerminalLines(createEmptyRoot(), [], terminalLines);
const pathsToSizes = getPathsToSizes(directoryStructureFromTerminal);

const usedSize = pathsToSizes['/'] as number;
const unusedSize = diskSize - usedSize;
const sizeToDelete = sizeNeed - unusedSize;

const sortedPathSizeTuples = Object
  .entries(pathsToSizes)
  .sort(( [ , aSize ], [ , bSize ] ) =>
    aSize - bSize
  );

const [ , sizeOfDirectoryToDelete ] = sortedPathSizeTuples.find(([ , size ]) =>
  size >= sizeToDelete
) as [ string, number ];

console.log(sizeOfDirectoryToDelete);
