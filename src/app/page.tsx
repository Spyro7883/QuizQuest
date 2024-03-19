"use client"
import Image from 'next/image'
import { useState } from "react"

export default function Home() {
  const [state, setState] = useState(0)
  let correctAnswers = 0;
  const changeState = (appStatus: number) => {
    setState(appStatus)
  }
  const tickTimer = () => {
    setTimeout("10s");
  }

  const pickAnswer = (answer: true) => {
    answer === true ? correctAnswers++ : <></>;
  }
  // console.log(renderedArray)

  const questionsArray = [
    {
      title: 'First Question',
      options: ['A. First option', 'B. Second option', 'C. Third option'],
      rAnswer: "A"
    },
    {
      title: 'Second Option',
      options: ['A. First option', 'B. Second option', 'C. Third option'],
      rAnswer: "B"
    },
  ];

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
              <button onClick={() => changeState(1)}>Start game</button> : <></>
            }
            <div>
              {state === 1 ?
                questionsArray.map((question, questionIndex: number) =>
                  <div key={questionIndex}><p>{question.title}</p>
                    <div>Timer: {"s"}</div>
                    <div>
                      {question.options.map((possibleAnswer, optionIndex: number) => {
                        return <button key={optionIndex} onClick={() => questionIndex + 1 === questionsArray.length && changeState(2)}>{possibleAnswer}</button>
                      }
                      )}
                    </div>

                  </div>
                )
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
