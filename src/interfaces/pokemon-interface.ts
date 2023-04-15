export interface IPokemon {
  id: number;
  name: string;
  imageSrc: string;
  peso: number;
  altura: number;
  tipos: string[];
  habilidades: string[];

  //DADOS EXTRAS PARA A TELA DE DETALHES
  games: string[];
  quantidadeMovimentosDisponiveis: number;
  vida: number;
  ataque: number;
  defesa: number;
  ataqueEspecial: number;
  defesaEspecial: number;
  velocidade: number;
}
