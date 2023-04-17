export function getBackgroundColorsRandomly(numberOfColors: number): string[] {
  const colors: string[] = [];
  for (let i = 0; i < numberOfColors; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}

export function getRandomColor(): string {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
}


export function capitalizeFirstWordLetters(word: string): string {
  const onlyLetters = word.replace(/[^a-zA-Z]/g, " ");
  const words = onlyLetters.split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
}

export async function getResultsFromApi(clientClass: any, listMethod: any, getMethod: any): Promise<any> {
  const client = new clientClass();

  const resultsFromApi = await client[listMethod]();
  if (!resultsFromApi) return;

  const results = await Promise.all(
    resultsFromApi.results.map(async (result: any) => {
      const resultFromApi = await client[getMethod](result.name);

      return {
        ...resultFromApi
      };
    }
    )
  );

  return results;
}