import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface ICellProps {
  specificStyle?: ViewStyle;
  value: string;
  setValue: (value: string) => void;
}

export default function App() {
  const [table, setTable] = useState<string[]>(Array(9).fill(''));
  const [player, setPlayer] = useState<boolean>(true);
  const [player1Wins, setPlayer1Wins] = useState<number>(0);
  const [player2Wins, setPlayer2Wins] = useState<number>(0);

  useEffect(() => {
    let check = checkWinner();
    if (check > 0) {
      handleWin(check);
      return;
    }
    if(check == 0){
      handleDraw()
      return;
    }
    if(!player){
      handleBotMove();
    }
  }, [table]);

  const Cell = ({ specificStyle, value, setValue }: ICellProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (value === '') {
            setValue(player ? 'X' : 'O');
            setPlayer(!player);
          }
        }}
        style={[styles.cell, specificStyle]}>
        <Text>{value}</Text>
      </TouchableOpacity>
    );
  };

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (table[a] && table[a] === table[b] && table[a] === table[c] && table[a] != '') {
        return table[a] == 'X' ? 1 : 2;
      }
    }

    for (let cell of table) {
      if (cell === '') {
        return -1;
      }
    }

    return 0;
  };

  const handleValueChange = (index: number, newValue: string) => {
    const updatedValues = [...table];
    updatedValues[index] = newValue;
    setTable(updatedValues);
  };

  const handleBotMove = () => {
    let position: number;

    do {
      position = Math.floor(Math.random() * 9);
    } while (table[position] !== '');

    const updatedValues = [...table];
    updatedValues[position] = 'O';
    setTable(updatedValues);
    setPlayer(!player);
  }

  const handleWin = (value: number) => {
    if (value == 1) {
      setPlayer1Wins(prevWins => prevWins + 1);
    } else {
      setPlayer2Wins(prevWins => prevWins + 1);
    }
    setTable(Array(9).fill(''));
  }

  const handleDraw = () => {
    setTable(Array(9).fill(''));
  }

  const handleClear = () => {
    setTable(Array(9).fill(''));
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
            value={table[0]}
            setValue={(newValue) => handleValueChange(0, newValue)}
          />
          <Cell
            value={table[1]}
            setValue={(newValue) => handleValueChange(1, newValue)}
            specificStyle={styles.middleColumn}
          />
          <Cell
            value={table[2]}
            setValue={(newValue) => handleValueChange(2, newValue)}
          />
        </View>
        <View style={[styles.line, styles.middleLine]}>
          <Cell
            value={table[3]}
            setValue={(newValue) => handleValueChange(3, newValue)}
          />
          <Cell
            value={table[4]}
            setValue={(newValue) => handleValueChange(4, newValue)}
            specificStyle={styles.middleColumn}
          />
          <Cell
            value={table[5]}
            setValue={(newValue) => handleValueChange(5, newValue)}
          />
        </View>
        <View style={styles.line}>
          <Cell
            value={table[6]}
            setValue={(newValue) => handleValueChange(6, newValue)}
          />
          <Cell
            value={table[7]}
            setValue={(newValue) => handleValueChange(7, newValue)}
            specificStyle={styles.middleColumn}
          />
          <Cell
            value={table[8]}
            setValue={(newValue) => handleValueChange(8, newValue)}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => handleClear()} style={styles.button}>
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