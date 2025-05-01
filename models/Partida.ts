import Jogador from "./Jogador";
import Peca from "./Peca";

export default class Partida {
  private jogador1: Jogador;
  private jogador2: Jogador;
  private tabuleiro: Peca[][];
  private vezPrimeiro: boolean;

  constructor(jogador1: Jogador, jogador2: Jogador) {
    this.jogador1 = jogador1;
    this.jogador2 = jogador2;
    this.tabuleiro = new Array(3).fill(new Array(3).fill(Peca.NONE));
    this.vezPrimeiro = true;
  }

  get getJogador1() {
    return this.jogador1;
  }

  get getJogador2() {
    return this.jogador2;
  }

  get getTabuleiro() {
    return this.tabuleiro;
  }

  get getVezPrimeiro() {
    return this.vezPrimeiro;
  }

  joga(linha: number, coluna: number, peca: Peca) {
    this.tabuleiro[linha][coluna] = peca;
  }

  mudaVez() {
    this.vezPrimeiro = !this.vezPrimeiro;
  }

  verificaFim() {
    const winConditions = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (
        this.tabuleiro[a[0]][a[1]] === this.tabuleiro[b[0]][b[1]] &&
        this.tabuleiro[c[0]][c[1]] === this.tabuleiro[a[0]][a[1]] &&
        this.tabuleiro[a[0]][a[1]] != Peca.NONE
      ) {
        return this.tabuleiro[a[0]][a[1]] == Peca.X ? 1 : 2;
      }
    }

    for (let line of this.tabuleiro) {
      for (let cell of line) {
        if (cell === Peca.NONE) {
          return -1;
        }
      }
    }

    return 0;
  }
}
