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
  let [questionNumber, setQuestionNumber] = useState(0);
  let correctAnswers = 0;
  const changeState = (appStatus: number) => {
    setState(appStatus)
  }
  const pickAnswer = (answer: true) => {
    answer === true ? correctAnswers++ : <></>;
  }



  const testTimeout = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTimeout(() => {
      console.log("Delayed for 1 second");
      console.log(questionsArray[questionNumber])
      console.log(`QuestionNumber is ${questionNumber}`)
    }, 1000)
  }

  const renderArray = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setTimeout(() => {
    questionNumber + 1 === questionsArray.length ?
      (() => { changeState(2); setQuestionNumber(0), setShownQuestion(questionsArray[questionNumber]) }) : <></>
    if (shownQuestion !== questionsArray[questionNumber + 1]) {
      setShownQuestion(questionsArray[questionNumber + 1])
      setQuestionNumber(questionNumber + 1);
    }
    // }, 1000)

  }
  useEffect(() => {

  }, [shownQuestion])

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
                <div ><p>{shownQuestion.title}</p>
                  <div>Timer: {"s"}</div>
                  <div>
                    {shownQuestion.options.map((possibleAnswer: any, optionIndex: number) => {
                      return <button key={optionIndex} onClick={renderArray}>{possibleAnswer}</button>
                    }
                    )}
                  </div>
                  <button onClick={testTimeout}>Try me</button>
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
