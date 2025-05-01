export default class Jogo {
  private numeroDePartidas: number;

  constructor() {
    this.numeroDePartidas = 0;
  }

  get getNumeroDePartidas() {
    return this.numeroDePartidas;
  }
}
