export default class Jogador {
  private name: string;
  private vitorias: number;

  constructor(name: string, vitorias: number){
    this.name = name;
    this.vitorias = vitorias;
  }

  get getName(){
    return this.name;
  }

  get getVitorias(){
    return this.name;
  }

  adicionaVitoria() {
    this.vitorias++;
  }
}