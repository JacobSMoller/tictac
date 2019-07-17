import React from "react";

function Team(props) {
  return (
    <span>
      {props.name}: {props.score}
    </span>
  );
}

function ScoreBoard(props) {
  let teams = [];
  console.log(props.scores);
  for (var key in props.scores) {
    teams.push(<Team key={key} name={key} score={props.scores[key]} />);
  }
  let rv;
  rv = (
    <div>
      {teams[0]} - {teams[1]}
    </div>
  );

  return rv;
}

export default ScoreBoard;
