export default function Main(props) {
  return (
    <main>
      <div className="game--wrapper">
        <h1 className="game--title">Tenzies</h1>

        <p className="game--desc">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <p>Roll numbers: {props.rollNumbers}</p>

        <div className="dice--wrapper">{props.dices}</div>

        <button className="game--button" onClick={props.rollDice}>
          {props.gameStatus ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
