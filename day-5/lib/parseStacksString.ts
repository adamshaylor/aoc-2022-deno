import type { Crate, Row, Stack } from './types.ts';

const parseRowString = (rowString: string): Row =>
  Array.from(
    { length: 9 },
    (_, index) => {
      const positionString = rowString[(index * 4) + 1];
      if (positionString === ' ') {
        return null;
      }
      return positionString as Crate
    }
  );

const parseStacksString = (stacksString: string): Stack[] => {
  const rowsStrings = stacksString.split('\n').slice(0, -1);
  const rows = rowsStrings.map(parseRowString);
  const stacks: Stack[] = Array.from({ length: 9 }, () => []);
  for (let rowIndex = rows.length - 1; rowIndex >= 0; rowIndex -= 1) {
    for (let stackIndex = 0; stackIndex <= 9; stackIndex += 1) {
      const position = rows[rowIndex][stackIndex];
      if (position) {
        stacks[stackIndex].push(position);
      }
    }
  }
  return stacks;
};

export default parseStacksString;
