import { describe, expect, it } from 'vitest';
import { getBackgroundColorsRandomly, getRandomColor } from '../helpers/dashboardHelpers';

const colorRegex = /^#[0-9a-f]{3,6}$/i;

describe('getBackgroundColorsRandomly', () => {
  it('retorna um array de cores aleatórias com o tamanho passado como parâmetro', () => {
    const colors = getBackgroundColorsRandomly(3);
    expect(colors).toHaveLength(3);
    expect(colors[0]).toMatch(colorRegex);
    expect(colors[1]).toMatch(colorRegex);
    expect(colors[2]).toMatch(colorRegex);
    expect(colors[0]).not.toEqual(colors[1]);
    expect(colors[0]).not.toEqual(colors[2]);
    expect(colors[1]).not.toEqual(colors[2]);
  });
});

describe('getRandomColor', () => {
  it('retorna uma cor aleatória no formato hex (#FFFFFF)', () => {
    const color = getRandomColor();
    expect(color).toMatch(colorRegex);
  });
});
