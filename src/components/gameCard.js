const GameCard = ({ game }) => {
  return (
    <div className="p-1 rounded-3 d-flex flex-column ">
      {/* <div className="d-flex flex-column" style={{ height: "100%" }}> */}
      <img src={game?.imageUrl} alt="game" className="rounded-3" style={{ width: "100%", height: "160px", objectFit: "cover" }} />
      {/* </div> */}
    </div>
  );
};

export default GameCard;
