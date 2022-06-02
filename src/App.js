import Main from "./components/Main"
import React from "react"
import Die from "./components/Die"
import uuid from "react-uuid"
import Confetti from "react-confetti"

function App() {
  const [diceArray, setDiceArray] = React.useState(makeNewDice())
  const [gameStatus, setGameStatus] = React.useState(false)
  const [rollNumbers, setRollNumbers] = React.useState(0)
  const [bestScore, setBestScore] = React.useState(getBestScore())

  function getBestScore() {
    if (localStorage.getItem("gameRolls")) {
      return Math.min(...JSON.parse(localStorage.getItem("gameRolls")))
    } else {
      return ""
    }
  }

  React.useEffect(() => {
    const firstVal = diceArray[0].num
    const allHold = diceArray.every((die) => {
      return die.isHold === true
    })
    const allEqual = diceArray.every((die) => {
      return die.num === firstVal
    })

    if (allHold && allEqual) {
      setGameStatus(true)
    }
  }, [diceArray])

  React.useEffect(() => {
    if (gameStatus) {
      const gameRollsFromStorage =
        JSON.parse(localStorage.getItem("gameRolls")) || []

      localStorage.setItem(
        "gameRolls",
        JSON.stringify([...gameRollsFromStorage, rollNumbers])
      )

      setBestScore(Math.min(...gameRollsFromStorage, rollNumbers))
    }
  }, [gameStatus, rollNumbers])

  function rollDice() {
    if (gameStatus) {
      setGameStatus(false)
      setRollNumbers(0)
      setDiceArray(makeNewDice())
    } else {
      const rollDiceArray = diceArray.map((die) => {
        if (die.isHold) {
          return die
        } else {
          let id = uuid()
          let num = Math.floor(Math.random() * 6) + 1
          return {
            id: id,
            num,
            isHold: false,
          }
        }
      })

      setDiceArray(rollDiceArray)
      setRollNumbers((prevNum) => prevNum + 1)
    }
  }

  function makeNewDice() {
    let numArray = []
    for (let i = 0; i < 10; i++) {
      let id = uuid()
      let num = Math.floor(Math.random() * 6) + 1
      numArray.push({
        id: id,
        num,
        isHold: false,
      })
    }

    return numArray
  }

  function handleToggleHold(id) {
    const newToggleArray = diceArray.map((die) => {
      if (die.id === id) {
        return { ...die, isHold: !die.isHold }
      } else {
        return die
      }
    })

    setDiceArray(newToggleArray)
  }

  const dices = diceArray.map((die) => (
    <Die toggleHold={handleToggleHold} key={die.id} die={die} />
  ))

  return (
    <div className="App">
      {gameStatus && <Confetti />}
      <Main
        dices={dices}
        rollDice={rollDice}
        gameStatus={gameStatus}
        rollNumbers={rollNumbers}
        bestScore={bestScore}
      />
    </div>
  )
}

export default App
