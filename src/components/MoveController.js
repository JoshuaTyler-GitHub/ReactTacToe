const MoveController = (props) => {
  const {
    moveNumber,
    redoDisabled,
    resetDisabled,
    undoDisabled,
    onRedo,
    onReset,
    onUndo,
  } = props;

  return(
    <div className="align-items-center d-flex p-1 w-100">

      {/* move number */}
      <h6 className="m-0">{`Move #${moveNumber || "1"}`}</h6>

      {/* button controls */}
      <div className="d-flex ml-auto">

        {/* Undo Button */}
        <button
          className="btn btn-primary px-2 py-0"
          disabled={undoDisabled}
          onClick={onUndo}
        >
          <h2
            className="m-0"
            style={{ transform: "scale(-1,1)"}}
          >
            {"➜"}
          </h2>
        </button>

        {/* Redo Button */}
        <button
          className="btn btn-primary ml-1 px-2 py-0"
          disabled={redoDisabled}
          onClick={onRedo}
        >
          <h2 className="m-0">
            {"➜"}
          </h2>
        </button>

      {/* Reset Button */}
      <button
        className="btn btn-primary ml-1 px-2 py-0"
        disabled={resetDisabled}
        onClick={onReset}
      >
        <h2 className="m-0">
          {"⭯"}
        </h2>
      </button>

      </div>

    </div>
  );
};
export default MoveController;
