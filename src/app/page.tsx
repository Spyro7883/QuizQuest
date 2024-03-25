"use client"
require("dotenv").config()
import { useState, useEffect } from "react"
import { questionsArray } from "./utils";
import { io, Socket } from 'socket.io-client';

export default function Home() {
  const [state, setState] = useState(0)
  const [shownQuestion, setShownQuestion] = useState(questionsArray[0]);
  const [timeLeft, setTimeLeft] = useState(5);
  const [socket, setSocket] = useState<Socket | null>(null);

  let [questionNumber, setQuestionNumber] = useState(0);
  let [correctAnswers, setCorrectAnswers] = useState(0);

  const changeState = (appStatus: number) => {
    setState(appStatus)
  }
  const checkAnswer = (optionIndex: number) => {
    if (shownQuestion.options[optionIndex].charAt(0) === shownQuestion.rAnswer) { setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1) }
    setTimeLeft(0)
  }

  const startGame = () => {
    changeState(1), setTimeLeft(5), setCorrectAnswers(0)
  };


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

  useEffect(() => {
    const newSocket = io(`http://0.0.0.0:${process.env.NEXT_PUBLIC_PORT}`);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log(`Connected to server with socket id: ${newSocket.id}`);
    });

    newSocket.on('nr of users', (arg) => {
      console.log(arg);
    });

    return () => {
      newSocket.off('connect');
      newSocket.off('nr of users');
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (state === 2 && socket) {
      socket.emit('results', correctAnswers);
    }
  }, [state, correctAnswers, socket]);

  return (
    <div>
      <header className="p-12">
        <h1 className="flex justify-center">
          QuizTime
        </h1>

      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <section>
            {state === 0 ?
              <div className="flex justify-center">
                <button onClick={startGame}>Start game</button>
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
