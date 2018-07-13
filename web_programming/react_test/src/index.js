import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// class Square extends React.Component {
//     render() {
//       return (
//         <button className="square" onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
// }

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
      </button>
    );
}


class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  } 
  render() {
        return (
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
    }
}




class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }   

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
}  
// ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}
  



// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


// function Welcome(props) {
//     return <h1>Hello, {props.name}</h1>; 
// }

// import React, { Component } from 'react';

// class Welcome extends React.Component {
// render() { return <h1>Hello, {this.props.name}</h1>; }
// }

// const element1 = <Welcome name="Ric" />;
// const element2 = <Welcome name="Mary" />;

// ReactDOM.render(element1,
//     document.getElementById('root'));


// ReactDOM.render(element2, 
//     document.getElementById('root'));


// class ScoreCard extends React.Component {
//     render(){
        
//         return (<div> 
//             <table>
//             <Caption name = {this.props.record.name} /> 
//             <SubjectList subjectNscore = {this.props.record.records[0]} />      
//             <SubjectList subjectNscore = {this.props.record.records[1]} />      
//             </table> 
//             </div>);
//     }
// }

// class Caption extends React.Component {
//     render(){
//         return (<tr><h2> {this.props.name} </h2></tr>);
//     }
// }

// class SubjectList extends React.Component {
//     render(){
//         return (<tr>
//             <td>{this.props.subjectNscore.subject} </td>
//             <td>{this.props.subjectNscore.score} </td>
//         </tr>);
//     }
// }

// const schoolRecord =
// { name: 'Ric',
// records:[
// {subject: 'Math', score:100},
// {subject: 'Chinese',score: 87}]
// };
    

// ReactDOM.render(
//     <ScoreCard record={schoolRecord} />,
//     document.getElementById('root'));


// class Clock extends React.Component {
//     constructor(props) {
//     super(props);
//     this.state = {date: new Date()};
//     }
//     componentDidMount() {
//         this.timerID = setInterval(() => {this.tick();}, 1000);
//         // console.log(this.timerID);
//     }
//     componentWillUnmount() { clearInterval(this.timerID); }
//     tick() { this.setState({date: new Date()});}
//     render() {
//     return (
//     <div>
//     <h1>Hello, world!</h1>
//     <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//     </div>
//     );}
// }

// ReactDOM.render(<Clock />, document.getElementById('root'));

// var a = new Clock();
// a.componentDidMount();

















