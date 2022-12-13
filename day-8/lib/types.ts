import type { ElementOf } from '../../lib/types.ts';

import { directions } from './constants.ts';

export type TreeGrid = number[][]
export type Coordinate = [ rowIndex: number, columnIndex: number ]
export type Direction = ElementOf<typeof directions>

export interface Step {
  coordinate: Coordinate
  treeHeight: number
}
