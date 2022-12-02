const convertInputToElvesRationsCalories = (input: string): number[][] =>
  input
    .split('\n\n')
    .map(elfRationsCaloriesString =>
      elfRationsCaloriesString
        .split('\n')
        .map(Number)
    );

export default convertInputToElvesRationsCalories;
