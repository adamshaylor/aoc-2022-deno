const product = (numbers: number[]): number =>
  numbers.reduce(
    (a, b) => a * b,
    1
  );

export default product;
