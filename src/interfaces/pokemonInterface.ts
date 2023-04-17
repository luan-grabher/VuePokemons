export interface IPokemon {
  id: number;
  name: string;
  imageSrc: string;
  weight: number;
  height: number;
  types: string[];
  abilities: string[];
  games: string[];
  movesQuantity: number;
  life: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}
