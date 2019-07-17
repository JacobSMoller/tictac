import React from "react";
import Button from "@material-ui/core/Button";

function NewGameButton(props) {
  return (
    <Button
      variant="contained"
      size="small"
      disabled={props.disabled}
      onClick={props.onReset}
      color="primary"
    >
      New Game
    </Button>
  );
}

export default NewGameButton;
