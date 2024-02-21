import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Buttons from "./components/Buttons";
import ProgressBar from "./components/ProgressBar";
import FinScreen from "./components/FinScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUES = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  memo: [],
  highscore: 0,
  remainingSecs: null
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed": return { ...state, status: "error" };
    case "start": return { ...state, status: "active", remainingSecs: state.questions.length * SECS_PER_QUES };
    case "newAns": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points
          : state.points
      };
    }
    case "showPrev": return { ...state, index: state.index - 1 };
    case "nextQues": {
      const index = state.index + 1;
      const updatedMemo = [...new Set([...state.memo, index])];
      const answer = state.memo.includes(index) ? index : null;
      return { ...state, index: index, memo: updatedMemo, answer: answer };
    }
    case "finish": return { ...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore };
    case "restart": return { ...initialState, questions: state.questions, status: "ready" };
    case "ticktick": return { ...state, remainingSecs: state.remainingSecs - 1, status: state.remainingSecs === 0 ? "finished" : state.status };

    default: throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore, remainingSecs }, dispatch] = useReducer(reducer, initialState);
  const numQues = questions.length;
  const maxPossPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQues={numQues} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              numQues={numQues}
              points={points}
              maxPossPoints={maxPossPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingSecs={remainingSecs} />
              <Buttons
                index={index}
                dispatch={dispatch}
                answer={answer}
                numQues={numQues}
                showPrev={index > 0 ? true : false}
              />
            </Footer>

          </>
        )}
        {status === 'finished' && (
          <FinScreen
            points={points}
            maxPossPoints={maxPossPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}

export default App;
