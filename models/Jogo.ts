import Jogador from "./Jogador";
import Partida from "./Partida";

export default class Jogo {
  private numeroDePartidas: number;
  private jogador1: Jogador;
  private jogador2: Jogador;

  constructor(jogador1: Jogador, jogador2: Jogador) {
    this.jogador1 = jogador1;
    this.jogador2 = jogador2;
    this.numeroDePartidas = 0;
  }

  public getNumeroDePartidas() {
    return this.numeroDePartidas;
  }

  public iniciaPartida() {
    return new Partida(this.jogador1, this.jogador2);
  }
}
