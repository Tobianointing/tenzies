import Main from "./components/Main";
import React from "react";
import Die from "./components/Die";
import uuid from "react-uuid";
import Confetti from "react-confetti";

function App() {
  const [diceArray, setDiceArray] = React.useState(makeNewDice());
  const [gameStatus, setGameStatus] = React.useState(false);
  const [rollNumbers, setRollNumbers] = React.useState(0);
  const [rollNumbersArray, setRollNumbersArray] = React.useState([]);

  React.useEffect(() => {
    const firstVal = diceArray[0].num;
    const allHold = diceArray.every((die) => {
      return die.isHold === true;
    });
    const allEqual = diceArray.every((die) => {
      return die.num === firstVal;
    });

    if (allHold && allEqual) {
      setGameStatus(true);
      setRollNumbersArray((prevState) => [...prevState, rollNumbers]);
    }
  }, [diceArray, rollNumbers]);

  React.useEffect(() => {
    const gameRollsFromStorage = JSON.parse(localStorage.getItem("gameRolls"));
    localStorage.setItem(
      "gameRolls",
      JSON.stringify([
        ...new Set(gameRollsFromStorage),
        ...new Set(rollNumbersArray),
      ])
    );
  }, [rollNumbersArray]);

  function rollDice() {
    if (gameStatus) {
      setGameStatus(false);
      setRollNumbers(0);
      setDiceArray(makeNewDice());
    } else {
      setRollNumbers((prevNum) => prevNum + 1);

      const rollDiceArray = diceArray.map((die) => {
        if (die.isHold) {
          return die;
        } else {
          let id = uuid();
          let num = Math.floor(Math.random() * 6) + 1;
          return {
            id: id,
            num,
            isHold: false,
          };
        }
      });

      setDiceArray(rollDiceArray);
    }
  }

  function makeNewDice() {
    let numArray = [];
    for (let i = 0; i < 10; i++) {
      let id = uuid();
      let num = Math.floor(Math.random() * 6) + 1;
      numArray.push({
        id: id,
        num,
        isHold: false,
      });
    }

    return numArray;
  }

  function handleToggleHold(id) {
    const newToggleArray = diceArray.map((die) => {
      if (die.id === id) {
        return { ...die, isHold: !die.isHold };
      } else {
        return die;
      }
    });

    setDiceArray(newToggleArray);
  }

  function handleRollDice() {
    rollDice();
  }

  const dices = diceArray.map((die) => (
    <Die toggleHold={handleToggleHold} key={die.id} die={die} />
  ));

  return (
    <div className="App">
      {gameStatus && <Confetti />}
      <Main
        dices={dices}
        rollDice={handleRollDice}
        gameStatus={gameStatus}
        rollNumbers={rollNumbers}
      />
    </div>
  );
}

export default App;
