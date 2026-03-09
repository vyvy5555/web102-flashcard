import './App.css';
import Card from "./components/Card"
import { useState } from 'react';

const App = () => {
  /* Flashcards bank */
  const flashcard = [
    {
      question: "What is the only antidote to Basilisk venom?",
      answer: "Phoenix tears"
    },
    {
      question: "Which magical object did Dumbledore leave to Ron in his will?",
      answer: "Deluminator"
    },
    {
      question: "As well as the sword of Godric Gryffindor, which object did Dumbledore leave to Harry in his will?",
      answer: "Snitch"
    },
    {
      question: "What form does Dolores Umbridge's Patronus take?",
      answer: "Cat"
    },
    {
      question: "What remedy does Hermione use to heal Ron's splinched arm?",
      answer: "Essence of Dittany"
    },
    {
      question: "Which dangerous horn does Hermione notice in the Lovegoods' house, which they believe to be from a Crumple-Horned Snorkack?",
      answer: "Erumpent horn"
    },
    {
      question: "Which spell does Hermione use to disfigure Harry's face, hoping that the Death Eaters wing recognise him?",
      answer: "Stinging Jinx"
    },
    {
      question: "What were Dobby's final two words?",
      answer: "Harry Potter"
    },
    {
      question: "What did Harry engrave on Dobby's white gravestone?",
      answer: "Here lies Dobby, a Free Elf"
    },
    {
      question: "What name is Buckbeak given in order to conceal his identity from the Ministry?",
      answer: "Witherwings"
    },
  ]

  /* State variables (current card, flip state) */
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFront, setIsFront] = useState(false)

  const currentCard = flashcard[currentCardIndex]

  /* Helper functions */
  const handleFlip = () => setIsFront(!isFront);

  const handleNextCard = () => {
    if (currentCardIndex < flashcard.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
    else {
      setCurrentCardIndex(0);
    }
    setIsFront(false);
  }

  /* Return UI */
  return (
    <div className="App">
      <h1>Harry Potter Ultimate Trivia 🪄</h1>
      <h3>Only true witches and wizards can master these Harry Potter trivia questions.</h3>
      <h4>Number of Cards: {flashcard.length}</h4>
      <div className="card-container">
        <Card front={currentCard.question} back={currentCard.answer} isFlipped={isFront} handleFlip={handleFlip}/>
      </div>
      <button onClick={handleNextCard} className="next-button">
        Next Card
      </button>
    </div>
  )
}

export default App
