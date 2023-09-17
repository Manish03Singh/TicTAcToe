import { useEffect, useState } from 'react';
import './App.css';
import React from 'react'

const App = () => {
  const [value, setVlaue] = useState(["","","","","","","","",""]);
  const [btnClassName, setBtnClassName] = useState("");
  const [boxClassName, setBoxClassName] = useState(["","","","","","","","",""]);
  const [player, setPlayer] = useState("");
  const [winner,setWinner] = useState("");
  const [tied, setTied] = useState(false);
  const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  function CheckForWin(){
    let answer = ""
    let newBoxClassName = boxClassName;
    winningPositions.forEach((position) => {
      if( (value[position[0]] !== "" || value[position[1]] !== "" || value[position[2]] !== "") 
          && (value[position[0]] === value[position[1]] ) && (value[position[1]] === value[position[2]])) {
              if(value[position[0]] === "X") 
                answer = 'X';
              else {
                answer = 'O';
              } 
              newBoxClassName[position[0]] = `box box${position[0]} win`;
              newBoxClassName[position[1]] = `box box${position[1]} win`;
              newBoxClassName[position[2]] = `box box${position[2]} win`;
          } 
    });

    if(answer !== ""){
      setWinner(answer);
      return true;
    }
    return false;
  }

  function CheckGridComplete(){
    let count = 0;

    for(let i = 0; i < 9; i++){
      if(value[i] !== "")
        count++;
    }

    return count === 9;
  }

  function newGameHnadler() {
    resetGame();
  }

  function writeValueHnadler(index){
    let dummmyValue = value;
    value[index] = player;
    setVlaue(dummmyValue);

    if(player === 'X')
      setPlayer('O')
    else  
      setPlayer('X');

    if(CheckForWin()){
      setBtnClassName('btn active');
    }

    if(CheckGridComplete()){
      setTied(true);
      setBtnClassName('btn active');
    }
  }
  
  function resetGame(){
    setVlaue(["","","","","","","","",""]);
    setPlayer('X');
    setWinner('');
    setTied(false);
    setBtnClassName('btn');
    setBoxClassName([ "box box0", "box box1", "box box2", "box box3", "box box4", "box box5", "box box6", "box box7", "box box8"]);
    //hide new game button
  }

  useEffect(() => {
    resetGame();
  }, [])
  
  return (
    <div className='wrapper'>
      {winner ? (<p className='game-info'>{`Winner Player - ${winner}`}</p>) 
              : 
              (tied ? (<p className='game-info'>Game Tied!</p>) 
                    :
                      (<p className='game-info'>{`Current Player - ${player}`}</p>)
              )
      }
      
      <div className="tic-tac-toe">
            <div className={boxClassName[0]} onClick={() => writeValueHnadler(0)}>{value[0]}</div>
            <div className={boxClassName[1]} onClick={() => writeValueHnadler(1)}>{value[1]}</div>
            <div className={boxClassName[2]} onClick={() => writeValueHnadler(2)}>{value[2]}</div>
            <div className={boxClassName[3]} onClick={() => writeValueHnadler(3)}>{value[3]}</div>
            <div className={boxClassName[4]} onClick={() => writeValueHnadler(4)}>{value[4]}</div>
            <div className={boxClassName[5]} onClick={() => writeValueHnadler(5)}>{value[5]}</div>
            <div className={boxClassName[6]} onClick={() => writeValueHnadler(6)}>{value[6]}</div>
            <div className={boxClassName[7]} onClick={() => writeValueHnadler(7)}>{value[7]}</div>
            <div className={boxClassName[8]} onClick={() => writeValueHnadler(8)}>{value[8]}</div>
        </div>

        <button className={btnClassName} onClick={() => newGameHnadler()}>New Game</button>
    </div>
  )
}

export default App;
