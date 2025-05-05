import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Jogador from './models/Jogador';
import React from 'react';
import Partida from './models/Partida';
import JogadorAutomatizado from './models/JogadorAutomatizado';
import Jogo from './models/Jogo';
import Peca from './models/Peca';
import SituacaoPartida from './models/SituacaoPartida';

interface ICellProps {
  specificStyle?: ViewStyle;
  value: string;
  setValue: (value: string) => void;
}

export default function App() {
  const jogador1 = new Jogador("You");
  const jogador2 = new JogadorAutomatizado("Machine");
  const jogoInicio = new Jogo(jogador1, jogador2);
  const partida = useRef<Partida>(jogoInicio.iniciaPartida());
  const jogo = useRef<Jogo>(jogoInicio);
  const [table, setTable] = useState<string[][]>(Array(3).fill(['', '', '']));
  const [player1Wins, setPlayer1Wins] = useState<number>(0);
  const [player2Wins, setPlayer2Wins] = useState<number>(0);

  useEffect(() => {
    const check = partida.current.verificaFim();
    if (check == SituacaoPartida.VitoriaJogador1 || check == SituacaoPartida.VitoriaJogador2) {
      handleWin(check);
      return;
    }
    if (check == SituacaoPartida.Empate) {
      handleClear();
      return;
    }
    if (!partida.current.getVezPrimeiro()) {
      handleBotMove();
    }
  }, [table]);

  const Cell = ({ specificStyle, value, setValue }: ICellProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (value === '') {
            setValue(partida.current.getVezPrimeiro() ? 'X' : 'O');
            partida.current.mudaVez()
          }
        }}
        style={[styles.cell, specificStyle]}>
        <Text>{value}</Text>
      </TouchableOpacity>
    );
  };

  const handleValueChange = (line: number, column: number, newValue: string) => {
    const vezPrimeiro = partida.current.getVezPrimeiro();
    partida.current.joga(line, column, vezPrimeiro ? Peca.X : Peca.O);

    const updatedValues = [...table];
    updatedValues[line][column] = newValue;
    setTable(updatedValues);
  };

  const handleBotMove = () => {
    const currentTable = partida.current.getTabuleiro();
    const [line, column] = (partida.current.getJogador2() as JogadorAutomatizado).realizaJogada(currentTable);
    const vezPrimeiro = partida.current.getVezPrimeiro();
    partida.current.joga(line, column, vezPrimeiro ? Peca.X : Peca.O);

    const updatedValues = [...table];
    updatedValues[line][column] = 'O';
    setTable(updatedValues);
    partida.current.mudaVez();
  }

  const handleWin = (value: SituacaoPartida) => {
    if (value == SituacaoPartida.VitoriaJogador1) {
      setPlayer1Wins(prevWins => prevWins + 1);
      partida.current.getJogador1().adicionaVitoria();
    } else {
      setPlayer2Wins(prevWins => prevWins + 1);
      partida.current.getJogador2().adicionaVitoria();
    }
    setTable(Array(9).fill(''));
  }

  const handleClear = () => {
    setTable(Array(3).fill(['', '', '']));
  }

  const handleRestart = () => {
    handleClear();
    setPlayer1Wins(0);
    setPlayer2Wins(0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.score}>
        <Text><Text style={styles.player}>You: </Text>{player1Wins}</Text>
        <Text><Text style={styles.player}>Machine: </Text>{player2Wins}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.line}>
          <Cell
            value={table[0][0]}
            setValue={(newValue) => handleValueChange(0, 1, newValue)}
          />
          <Cell
            value={table[0][1]}
            setValue={(newValue) => handleValueChange(0, 2, newValue)}
            specificStyle={styles.middleColumn}
          />
          <Cell
            value={table[0][2]}
            setValue={(newValue) => handleValueChange(0, 3, newValue)}
          />
        </View>
        <View style={[styles.line, styles.middleLine]}>
          <Cell
            value={table[1][0]}
            setValue={(newValue) => handleValueChange(1, 0, newValue)}
          />
          <Cell
            value={table[1][1]}
            setValue={(newValue) => handleValueChange(1, 1, newValue)}
            specificStyle={styles.middleColumn}
          />
          <Cell
            value={table[1][2]}
            setValue={(newValue) => handleValueChange(1, 2, newValue)}
          />
        </View>
        <View style={styles.line}>
          <Cell
            value={table[2][0]}
            setValue={(newValue) => handleValueChange(2, 0, newValue)}
          />
          <Cell
            value={table[2][1]}
            setValue={(newValue) => handleValueChange(2, 1, newValue)}
            specificStyle={styles.middleColumn}
          />
          <Cell
            value={table[2][2]}
            setValue={(newValue) => handleValueChange(2, 2, newValue)}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRestart()} style={styles.button}>
        <Text>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A7CDBD'
  },
  score: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10
  },
  table: {
    flexDirection: 'column',
  },
  line: {
    flexDirection: 'row',
  },
  middleLine: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  middleColumn: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  cell: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    color: '#91785D'
  },
  button: {
    width: 150,
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  }
});