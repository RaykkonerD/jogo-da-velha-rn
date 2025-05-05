import Jogador from "./Jogador";
import Peca from "./Peca";

export default class JogadorAutomatizado extends Jogador {
    constructor(name: string){
        super(name);
    }

    public realizaJogada(table: Peca[][]): [number, number] {
        return [1, 0];
    }

    private minimax(t: Peca[][], max: boolean): number {
        return 1;
    }
}