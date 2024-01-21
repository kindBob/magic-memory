const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (flipped || disabled) return;

    handleChoice(card);
  };

  return (
    <div className={`card ${flipped ? "--flipped" : ""}`} onClick={handleClick}>
      <div className="card__inner">
        <img
          className="card__face --front"
          src={`/img/${card.name}-1.png`}
          alt="card"
          draggable="false"
        />

        <img className="card__face --back" src="/img/cover.png" alt="cover" draggable="false" />
      </div>
    </div>
  );
};

export default SingleCard;
