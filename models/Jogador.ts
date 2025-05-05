export default class Jogador {
  private name: string;
  private vitorias: number;

  constructor(name: string){
    this.name = name;
    this.vitorias = 0;
  }

  public getName(){
    return this.name;
  }

  public getVitorias(){
    return this.name;
  }

  public adicionaVitoria() {
    this.vitorias++;
  }
}