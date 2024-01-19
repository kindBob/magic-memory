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
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  useEffect(() => {
    if (!choiceTwo) return;

    if (choiceOne.name === choiceTwo.name) {
      const updatedCards = cards;

      updatedCards.forEach((card) => {
        if (card.name !== choiceOne.name) return;

        card.matched = true;
      });

      setCards(updatedCards);
    } else {
      document.querySelector(`#id-${choiceOne.id}`).classList.remove("--active");
      document.querySelector(`#id-${choiceTwo.id}`).classList.remove("--active");
    }

    resetTurn();
  }, [choiceOne, choiceTwo]);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (choiceOne && card.id !== choiceOne.id) setChoiceTwo(card);
    else setChoiceOne(card);

    document.querySelector(`#id-${card.id}`).classList.add("--active");
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turns) => turns + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="cards-grid">
        {cards.map((card) => (
          <SingleCard key={card.id} cardProps={card} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
