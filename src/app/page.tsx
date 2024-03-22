"use client"
import { useState, useEffect } from "react"
import { questionsArray } from "./utils";

export default function Home() {
  const [state, setState] = useState(0)
  const [shownQuestion, setShownQuestion] = useState(questionsArray[0]);
  const [timeLeft, setTimeLeft] = useState(5);
  let [questionNumber, setQuestionNumber] = useState(0);
  let [correctAnswers, setCorrectAnswers] = useState(0);
  let shuffleArray = [];

  const changeState = (appStatus: number) => {
    setState(appStatus)
  }
  const checkAnswer = (optionIndex: number) => {
    if (shownQuestion.options[optionIndex].charAt(0) === shownQuestion.rAnswer) { setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1); console.log(`These are the correct answers: ${correctAnswers}`) }
    else console.log("wrong answer");
    setTimeLeft(0)
  }

  const shuffleQuestions = () => {
    for (let i = 0; questionsArray.length - i < questionsArray.length; i++) {
      // console.log("it works");
      // if (questionsArray.length - 1 < 0) break;
    }
  }

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else {
      if (shownQuestion !== questionsArray[questionNumber + 1] && questionNumber + 1 !== questionsArray.length) {
        setShownQuestion(questionsArray[questionNumber + 1])
        setQuestionNumber(questionNumber + 1);
        setTimeLeft(5)
      }
      else { changeState(2); setShownQuestion(questionsArray[0]), setQuestionNumber(0), console.log('Countdown finished!'); console.log(correctAnswers) }

    }
  }, [timeLeft]);

  return (
    <div>
      <header>
        <h1>
          QuizTime
        </h1>

      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <section>
            {state === 0 ?
              <div>
                <button onClick={() => { changeState(1), setTimeLeft(5), setCorrectAnswers(0) }}>Start game</button>
                <button onClick={shuffleQuestions}>Test</button>
              </div> : <></>

            }
            <div>
              {state === 1 ?
                <div ><p>{shownQuestion.title}</p>
                  <div>
                    <p>Time left {timeLeft}</p>
                    {shownQuestion.options.map((possibleAnswer: any, optionIndex: number) => {
                      return <button key={optionIndex} onClick={() => checkAnswer(optionIndex)}>{possibleAnswer} &nbsp;</button>
                    }
                    )}
                  </div>
                </div>
                : null}

            </div>
            {state === 2 ?
              <div>
                <p>Results are {correctAnswers}</p>
                <button onClick={() => changeState(0)}>Restart Game</button>
              </div> : <></>
            }
          </section>
        </div>
      </main>
      <footer />
    </div>
  )
}
