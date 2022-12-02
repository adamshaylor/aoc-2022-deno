export type OpponentShapeCode = 'A' | 'B' | 'C'
export type Shape = 'rock' | 'paper' | 'scissors'
export type Outcome = 'win' | 'loss' | 'draw'

export interface Round {
  opponent: Shape
  me: Shape
}
