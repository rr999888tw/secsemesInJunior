import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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


class Clock extends React.Component {
    constructor(props) {
    super(props);
    this.state = {date: new Date()};
    }
    componentDidMount() {
        this.timerID = setInterval(() => {this.tick();}, 1000);
        // console.log(this.timerID);
    }
    componentWillUnmount() { clearInterval(this.timerID); }
    tick() { this.setState({date: new Date()});}
    render() {
    return (
    <div>
    <h1>Hello, world!</h1>
    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    </div>
    );}
}

ReactDOM.render(<Clock />, document.getElementById('root'));

// var a = new Clock();
// a.componentDidMount();

















