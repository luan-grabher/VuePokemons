import { describe, test, expect, it } from 'vitest';
import { pokemonTypes } from '../helpers/pokemonTypes';

const colorRegex = /^#[0-9a-f]{6}$/i;
const pokemonTypesNames = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy'
];

describe('pokemonTypes', () => {
  test('should have all types', () => {
    expect(Object.keys(pokemonTypes).length).toBe(pokemonTypesNames.length);
  });

  for (const type of pokemonTypesNames) {
    test(`should have ${type} type`, () => {
      expect(pokemonTypes[type]).toBeDefined();
    });
  }

  test('should have all properties', () => {
    pokemonTypesNames.forEach((type) => {
      expect(pokemonTypes[type]).toHaveProperty('icon');
      expect(pokemonTypes[type]).toHaveProperty('color');
      expect(pokemonTypes[type]).toHaveProperty('label');
    });
  });

  test('should have valid colors', () => {
    pokemonTypesNames.forEach((type) => {
      expect(pokemonTypes[type].color).toMatch(colorRegex);
    });
  });
});
