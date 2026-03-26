# ✊✌️✋ Rock Scissors Paper Game (React.ver)

## 🎬 프로젝트 소개

🎮 배포 링크 : [https://rock-scissorspaper-game.netlify.app/](https://rockscissorpaper-game.netlify.app/)
<br>
<br>

## 🎮 주요 기능 
- 가위/바위/ 보 버튼 선택
- 컴퓨터는 버튼 클릭시 자동 랜덤 선택
- 승패 판정 기능
- 버튼 클릭 시 남은 기회 표시
- 이긴 횟수 점수 집계 (유저,컴퓨터)

- 반응형 (모바일 지원)

## ⚙️ 사용 기술
- React (useState)
- CSS (Flexbox, 반응형)
- JSX

## 🧠 핵심 로직 정리

### (1) 상태 관리 (useState 사용)
```
  const [userSelect, setUserSelect] = useState(null)
  const [computerSelect, setComputerSelect] = useState(null)
  const [result, setResult] = useState('')
  const [chance, setChance] = useState(5)
  const [userWin, setUserWin] = useState(0)
  const [computerWin, setComputerWin] = useState(0)
```
1. userSelect/computerSelect
    - 사용자의 선택과 컴퓨터의 선택 저장
    - 선택 된 값에 따라 이모지 표시
    - 화면에 어떤 상태를 보여줄지 결정
  
  
2. result
    - 결과를 저장
    - 결과에 따라 박스 스타일 변경
3. chance
    - 남은 게임 횟수 관리
    - 0이 되면 더이상 게임 진행 x
    - 게임의 종료조건 제어 상태

4. userWin/computerWin
    - 각각 승리 횟수 저장
    - 최종 결과에 사용됨
    - 게임 승자 정하는 데이터

💡 따라서 ui 표시용 상태/ 로직 제어용 상태/ 데이터 누적 상태로 나누어 설계했습니다.

  
### (2) 게임 실행 로직
```
  const play = (userChoice) =>
  {
  if (chance === 0) return; // 찬스 끝나면 게임 종료
  setChance(prev => prev - 1) // 이전 값에서 -1씩 빼기
  setUserSelect(choice[userChoice]) // 유저 상태 저장
   const random = randomSelect() 
  setComputerSelect(choice[random]) // 컴퓨터 랜덤 저장
  const resultContent = judgement(choice[userChoice], choice[random]) // 점수 업데이트


  if (resultContent === "Win")
  { setUserWin(prev => prev + 1) } //유저가 이겼을 때 +1
   else if (resultContent === "Lose")
  { setComputerWin(prev => prev + 1) } // 컴퓨터가 이겼을 때 +1
   setResult(resultContent) }
  ```
 <br>
<br>

### (3) 승패 판정 함수
  
  ```
    const judgement = (user, computer) => // 유저와 컴퓨터의 상태에 따라 승패 여부 판정
    {
    if (user.name === computer.name) return "Tie"
    if (user.name === "Rock") return computer.name === "Scissors" ? "Win" : "Lose"
    if (user.name === "Scissors") return computer.name === "Paper" ? "Win" : "Lose"
    if (user.name === "Paper") return computer.name === "Rock" ? "Win" : "Lose"
    }
  ```
<br>
<br>

### (4) 최종 결과 계산

```
chance === 0 // 찬스가 끝났을 때 최종 우승자 정하기
  ? userWin > computerWin
    ? "유저가 이겼습니다!"
    : computerWin > userWin
    ? "컴퓨터가 이겼습니다!"
    : "무승부입니다!"
  : ""
```
<br>
<br>

## ⚠️ 문제점 및 배운 점

### 1. state 즉시 변경 x

```
setChance(prev=>prev-1)
if(chance === 0) return
```

- 이 코드에서 chance는 바로 업데이트 되지 않고, 다음 렌더링에서 업데이트 되기 때문에 setChance 이후에 chance를 사용하면 이전값이 그대로 사용된다. 
그 결과 게임 종료 조건이 한 번 더 늦게 적용된다. 그렇기에 기회가 1번 더 생기는 문제점이 발생하였다.
- ✅ 해결 방안 : 상태 변경 전에 먼저 조건을 검사하였다. 


### 2. setState는 반드시 return 필수
```
   setUserWin(prev =>
   { if (resultContent === "Win")
    { return prev + 1 }
   return prev
   })
```
- setState의 콜백 함수는 이전 상태를 기반으로 새로운 값을 계산하고 반드시 반환 해야한다. 만약 return하지 않으면 undefined가 저장되기 때문에 반드시 반환해야한다. 그 이유는 state가 비동기적으로 업데이트 되기때문에 이전값을 쓰는게 더 안정적이다.

### 3. !userWin 조건문
```
!userWin > computerWin 
```
 - 이렇게 쓰였을 때. 먼저 boolean 으로 변환한 뒤 비교한다. 그렇기에 원하는 답이 나오지 않는다.
-  ✅ 해결 방안 : !(userWin>compiterWin)에 괄호를 사용하여 연산 우선순위를 명확하게 하였다. 
  

## 🎯 정리
state는 비동기적으로 업데이트된다.
setState에서는 반드시 값을 return 해야 한다.
