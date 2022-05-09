const GameBoard = (props) => {
  const { gameState } = props;
  const tiles = gameState.getTiles();

  return (
    <div className="col-12 d-flex justify-content-center mt-5">
      <div className="row" style={{ width: "15rem" }}>
        {tiles.map((value, index) => {
          return (
            <GameTile
              key={index}
              isO={value === "O"}
              isX={value === "X"}
              onClick={() => props.onGameMove(index)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default GameBoard;

export const GameTile = (props) => {
  const { isO, isX } = props;
  return(
    <div className="col-4 p-0">
      <button
        className="border-dark btn btn-light rounded-0"
        style={{ height: "5rem", width: "5rem" }}
        onClick={props.onClick}
      >
        {isO ? <h2 className="m-0">{"O"}</h2> : ""}
        {isX ? <h2 className="m-0">{"X"}</h2> : ""}
      </button>
    </div>
  );
};
