const SingleCard = ({ cardProps, handleChoice }) => {
  return (
    <div className="card">
      <img
        src={`/img/${cardProps.name}-1.png`}
        alt="card"
        id={`id-${cardProps.id}`}
        className="card__face --front"
      />
      <img
        className="card__face --back"
        onClick={() => handleChoice(cardProps)}
        src="/img/cover.png"
        alt="cover"
      />
    </div>
  );
};

export default SingleCard;
