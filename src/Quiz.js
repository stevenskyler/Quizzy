import React, { useState, useEffect } from 'react';
import quizData from './quizData';
import Confetti from 'react-confetti';
import './Quiz.css';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswerOptionClick = (option) => {
    const correctAnswer = quizData[currentQuestion].answer;
    setSelectedAnswer(option);
    if (option === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
      setShowConfetti(true); // Show confetti for correct answer
    } else {
      setIsCorrect(false);
    }

    // Delay moving to the next question to allow the user to see feedback
    setTimeout(() => {
      setShowConfetti(false); // Hide confetti after delay
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setIsCorrect(null); // Reset for the next question
        setSelectedAnswer(""); // Reset selected answer
      } else {
        setShowScore(true);
      }
    }, 2000); // Adjust time as needed
  };

  useEffect(() => {
    if (isCorrect !== null) {
      setShowConfetti(isCorrect);
    }
  }, [isCorrect]);

  return (
    <div className='quiz-container'>
      {showConfetti && <Confetti />}
      {showScore ? (
        <div className='score-section'>
          <h1>Congratulations!</h1>
          <p>You scored {score} out of {quizData.length}</p>
          <button onClick={() => window.location.reload()} className='restart-button'>
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{quizData.length}
            </div>
            <div className='question-text'>{quizData[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            {quizData[currentQuestion].options.map((option) => (
              <button 
                onClick={() => handleAnswerOptionClick(option)} 
                key={option}
                className={`answer-button ${selectedAnswer === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? 'Correct! 🎉' : 'Sorry, that’s not right. 😢'}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
