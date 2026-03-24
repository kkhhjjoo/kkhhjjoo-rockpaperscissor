
import { useState } from 'react';
import './App.css'
import Box from './component/Box'


const CHOICES = [
  {
    id: "scissors",
    label: "가위",
    src: "https://cdn.jsdelivr.net/npm/openmoji@14.0.0/color/svg/270C.svg",
  },
  {
    id: "rock",
    label: "바위",
    src: "https://cdn.jsdelivr.net/npm/openmoji@14.0.0/color/svg/270A.svg",
  },
  {
    id: "paper",
    label: "보",
    src: "https://cdn.jsdelivr.net/npm/openmoji@14.0.0/color/svg/1F590.svg",
  },
];
const QUESTION_IMG =
  "https://cdn.jsdelivr.net/npm/openmoji@14.0.0/color/svg/2753.svg";

function winsAgainst(a, b) {
  return (
    (a === "rock" && b === "scissors") ||
    (a === "scissors" && b === "paper") ||
    (a === "paper" && b === "rock")
  );
}

function getResult(my, com) {
  if (my === com) return "tie";
  return winsAgainst(my, com) ? "win" : "lose";
}

const RESULT_TEXT = {
  win: "내가 이겼어요! 🎉",
  lose: "컴퓨터가 이겼어요 😢",
  tie: "무승부! 다시 도전해봐요 🤝",
};

function App() {

  const [myChoice, setMyChoice] = useState(null);
  const [comChoice, setComChoice] = useState(null);
  const [result, setResult] = useState('');
  //1. 박스 2개(타이틀, 사진, 결과)
  //2. 가위 바위 보 버튼이 있다
  //3. 버튼을 클릭하면 클릭한 값이 박스에 보임
  //4. 컴퓨터는 랜덤하게 아이템 선택이 된다
  //5. 3,4의 결과를 가지고 누가 이겼는지 승패를 따진다
  //6. 승패 결과에 따라 테두리 색이 바뀐다(이기면 - 초록, 지면 - 빨강 비기면 - 검은색)

  function play(choiceId) {
     console.log('선택됨')
 
    const com = CHOICES[Math.floor(Math.random() * CHOICES.length)].id;
    console.log(com);

    const res = getResult(choiceId, com);
 

    setMyChoice(null);
    setComChoice(null);
 
    setTimeout(() => {
      setMyChoice(choiceId);
      setComChoice(com);
      setResult(res);
    }, 500);
  }

   const myImg = myChoice
    ? CHOICES.find((c) => c.id === myChoice)?.src
    : QUESTION_IMG;
 
  const comImg = comChoice
    ? CHOICES.find((c) => c.id === comChoice)?.src
    : QUESTION_IMG;
  
  const comResult = result === 'win' ? 'lose' : result === 'lose' ? 'win' : result;

  return (

    <>
    <div className='main'>
        <Box className="rps-choice-display" title="You" you={true} myImg={myImg}result={result} />
         <span className="rps-vs">VS</span>
        <Box className="rps-choice-display" title="Computer" comImg={comImg}
          result={comResult}
        />
    </div>
      <div className='main'>
        {CHOICES.map((choice) => (
          <button
            key={choice.id}
            className={`rps-choice-btn${myChoice === choice.id ? " selected" : ""}`}
            onClick={() => play(choice.id)}
          >
            <img src={choice.src} alt={choice.label} width={40} height={40} />
            <span>{choice.label}</span>
          </button>
        ))}
      </div>      
    </>
)
}

export default App
