import { describe, test, expect } from 'vitest';
import { normalizePokemon } from '../normalizers/pokemonNormalizer';
import { charizard } from './mocks/pokemons/charizard';
import { Pokemon } from 'pokenode-ts';

describe('normalizePokemon', () => {
    const expectedPokemon = {
        id: 6,
        name: 'Charizard',
        imageSrc:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png',
        weight: 90.5,
        height: 170,
        types: ['fire', 'flying'],
        abilities: ['blaze', 'solar-power'],
        games: [
            'red',
            'blue',
            'yellow',
            'gold',
            'silver',
            'crystal',
            'ruby',
            'sapphire',
            'emerald',
            'firered',
            'leafgreen',
            'diamond',
            'pearl',
            'platinum',
            'heartgold',
            'soulsilver',
            'black',
            'white',
            'black-2',
            'white-2'
        ],
        life: 78,
        attack: 84,
        defense: 78,
        spAttack: 109,
        spDefense: 85,
        speed: 100,
    };

    test('Deve retornar sem imagem', async () => {
        const charizardWithoutImage = {
            ...charizard,
            sprites: {
                front_default: null,
                other: {
                    home: {
                        front_default: null,
                    },
                },
            },
        } as Pokemon;

        const normalizedPokemon = normalizePokemon(charizardWithoutImage);

        expect(normalizedPokemon).toEqual({
            ...expectedPokemon,
            imageSrc:
                'https://via.placeholder.com/96x96.png?text=No+Image',
        });
    });
});
