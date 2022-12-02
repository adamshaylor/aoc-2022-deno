const sum = (numbers: number[]): number =>
  numbers.reduce(
    (a, b) => a + b,
    0
  );

export default sum;
