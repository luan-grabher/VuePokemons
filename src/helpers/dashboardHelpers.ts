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
