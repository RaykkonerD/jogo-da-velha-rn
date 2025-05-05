import Jogador from "./Jogador";
import Peca from "./Peca";
import SituacaoPartida from "./SituacaoPartida";

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

  public getJogador1() {
    return this.jogador1;
  }

  public getJogador2() {
    return this.jogador2;
  }

  public getTabuleiro() {
    return this.tabuleiro;
  }

  public getVezPrimeiro() {
    return this.vezPrimeiro;
  }

  public joga(linha: number, coluna: number, peca: Peca) {
    this.tabuleiro[linha][coluna] = peca;
  }

  public mudaVez(): void {
    this.vezPrimeiro = !this.vezPrimeiro;
  }

  public verificaFim(): SituacaoPartida {
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
        return this.tabuleiro[a[0]][a[1]] == Peca.X ? SituacaoPartida.VitoriaJogador1 : SituacaoPartida.VitoriaJogador2;
      }
    }

    for (let line of this.tabuleiro) {
      for (let cell of line) {
        if (cell === Peca.NONE) {
          return SituacaoPartida.EmAndamento;
        }
      }
    }

    return SituacaoPartida.EmAndamento;
  }
}
