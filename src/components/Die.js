import Dot from "./Dot";

export default function Die(props) {
  const innerDieArray = [];

  for (let i = 0; i < props.die.num; i++) {
    innerDieArray.push(<Dot key={i} />);
  }

  return (
    <div
      className={`die ${props.die.isHold ? "die__green" : ""}`}
      onClick={() => props.toggleHold(props.die.id)}
    >
      {innerDieArray}
    </div>
  );
}
