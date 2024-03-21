"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const questionsArray = [
    {
      title: 'First Question',
      options: ['A. First option', 'B. Second option', 'C. Third option'],
      rAnswer: "A"
    },
    {
      title: 'Second Option',
      options: ['A. First optionV2', 'B. Second optionV2', 'C. Third optionV2'],
      rAnswer: "B"
    },

  ];
  const [state, setState] = useState(0)
  const [shownQuestion, setShownQuestion] = useState(questionsArray[0]);
  const [timeLeft, setTimeLeft] = useState(5);
  let [questionNumber, setQuestionNumber] = useState(0);
  let [correctAnswers, setCorretAnswers] = useState(0);

  const changeState = (appStatus: number) => {
    setState(appStatus)
  }
  const checkAnswer = (optionIndex: number) => {
    // console.log(shownQuestion.options[optionIndex])
    shownQuestion.options[optionIndex].charAt(0) === shownQuestion.rAnswer ? setCorretAnswers(correctAnswers++) : console.log("wrong answer");
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
              <button onClick={() => { changeState(1), setTimeLeft(5) }}>Start game</button> : <></>
            }
            <div>
              {state === 1 ?
                <div ><p>{shownQuestion.title}</p>
                  <div>
                    <p>Time left {timeLeft}</p>
                    {shownQuestion.options.map((possibleAnswer: any, optionIndex: number) => {
                      return <button key={optionIndex} onClick={() => checkAnswer(optionIndex)}>{possibleAnswer}</button>
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
