import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

const cardImages = [
  { name: "helmet" },
  { name: "potion" },
  { name: "ring" },
  { name: "scroll" },
  { name: "shield" },
  { name: "sword" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(null);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!choiceTwo || disabled) return;

    setDisabled(true);

    if (choiceOne?.name === choiceTwo?.name) {
      const updatedCards = cards;

      updatedCards.forEach((card) => {
        if (card.name !== choiceOne.name) return;

        card.matched = true;
      });

      setCards(updatedCards);

      resetTurn();
    } else {
      setTimeout(resetTurn, 1000);
    }
  }, [choiceOne, choiceTwo, cards, disabled]);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);

    resetTurn();
  };

  useEffect(shuffleCards, []);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

    setTurns((turns) => turns + 1);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="cards-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card.hasOwnProperty("matched") || card === choiceOne || card === choiceTwo}
            disabled={disabled}
          />
        ))}
      </div>

      <h2 className="turns-counter">Turns: {turns ?? turns}</h2>
    </div>
  );
}

export default App;
