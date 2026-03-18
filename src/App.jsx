import './App.css';
import Card from "./components/Card"
import { useState } from 'react';
import flashcardsJson from "../flashcards.json"

const App = () => {

  /* State variables (current card, flip state) */
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFront, setIsFront] = useState(true)

  const currentCard = flashcardsJson.flashcards[currentCardIndex]
  const [userGuess, setUserGuess] = useState('')
  // Track if the guess has been submitted
  const [hasSubmitted, setHasSubmitted] = useState(false)
  
  // Track if the guess is correct
  const [isCorrect, setIsCorrect] = useState(false)

  const resetGuessState = () => {
    setUserGuess('')
    setHasSubmitted(false)
    setIsCorrect(false)
  }

  /* Helper functions */
  const handleFlip = () => {
    setIsFront(!isFront);
    resetGuessState();
  }

  const handleInputChange = (event) => {
    setUserGuess(event.target.value)
  }

  const handleNextCard = () => {
    if (currentCardIndex < flashcardsJson.flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
    else {
      setCurrentCardIndex(0);
    }
    setIsFront(true);
    resetGuessState();
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
    setIsFront(true);
    resetGuessState();
  }

  const handleSubmitGuess = () => {
    if (userGuess.trim() === '') return
    
    // Simple answer checking (case-insensitive, basic matching)
    const correctAnswer = currentCard.answer.toLowerCase()
    const guess = userGuess.toLowerCase().trim()
    
    // Check if guess contains key words from the answer
    const isAnswerCorrect = checkAnswer(guess, correctAnswer)
    
    setIsCorrect(isAnswerCorrect)
    setHasSubmitted(true)
  }

  const checkAnswer = (guess, correctAnswer) => {
    const normalizeText = (text) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[.,!?;:'"-]/g, '')
        .replace(/\s+/g, ' ')

    return normalizeText(guess) === normalizeText(correctAnswer)
  }

  /* Return UI */
  return (
    <div className="App">
      <div className="title-container">
        <h1 className='title'>Harry Potter Ultimate Trivia 🪄</h1>
        <p>Only true witches and wizards can master these Harry Potter trivia questions.</p>
        <h4>Number of Cards: {flashcardsJson.flashcards.length}</h4>
      </div>
      <div className="card-container">
        <Card front={currentCard.question} back={currentCard.answer} isFlipped={!isFront} handleFlip={handleFlip}/>
      </div>
      <div className="guess-container">
        <div className="input-group">
          <input
            type="text"
            value={userGuess}
            onChange={handleInputChange}
            placeholder="Enter your answer..."
            disabled={!isFront}
            className={`guess-input ${!isFront ? 'disabled' : ''}`}
          />
          <button 
            onClick={handleSubmitGuess}
            disabled={!isFront || userGuess.trim() === ''}
            className={`submit-btn ${!isFront ? 'disabled' : ''}`}
          >
            Submit
          </button>
        </div>
        
        {/* Feedback Display */}
        {hasSubmitted && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
        )}
      </div>
      <div className='navigation'>
        <button 
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
          className={`nav-btn prev-btn ${currentCardIndex === 0 ? 'disabled' : ''}`}>
          ← Previous
        </button>
        <button 
          onClick={handleNextCard} 
          disabled={currentCardIndex === flashcardsJson.flashcards.length - 1}
          className={`nav-btn next-btn ${currentCardIndex === flashcardsJson.flashcards.length - 1 ? 'disabled' : ''}`}>
          Next →
        </button>
      </div>
      
    </div>
  )
}

export default App
