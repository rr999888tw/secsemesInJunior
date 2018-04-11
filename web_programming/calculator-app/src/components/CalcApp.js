import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      display : "0",
      realval : 0,
      sign : "",
      his : []
    };
  }

  resetState() {
    // TODO
    this.setState({
      display: "0",
      realval: 0,
      sign : "",
      his : [] // this.state.his.splice(0,this.state.his.length)

    })
    
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  handleNumClick(numstr){
    // alert(num);
    
    let historylen = this.state.his.length;
    let latestClick = this.state.his[historylen - 1]
    
    if(latestClick == "÷" ||latestClick == "x" || 
    latestClick == "-" ||latestClick == "+"){
      this.setState({
        display: numstr,
        realval: this.state.realval,
        sign: this.state.sign,
        his: this.state.his.slice().concat([numstr])
      })
      return;
    }

    if(latestClick == "="){
      this.setState({
        display: numstr,
        realval: 0,
        sign: "",
        his: this.state.his.slice().concat([""])
      })
      return;
    }
    
    let display = this.state.display;
    if(display == "0") display = numstr;
    else display = display + numstr
    let his = this.state.his.slice();
    his.push(numstr)

    this.setState({
      display: display,
      realval: this.state.realval,
      sign: this.state.sign,
      his: his
    })

  } 

  handleSignClick(sign){
    // alert(sign);
    let historylen = this.state.his.length;
    let latestClick = this.state.his[historylen - 1];
    let display = this.state.display;

    if(latestClick == "÷" ||latestClick == "x" || 
    latestClick == "-" ||latestClick == "+"){
      
      this.setState({
        display: display,
        realval: this.state.realval,
        sign: sign,
        his: this.state.his.slice().concat([sign])
      })
      return;
    }
    
    const prevdisplay = parseInt(this.state.display);
    let realval = this.state.realval;

    switch(this.state.sign){
      case "÷":
        realval = realval / prevdisplay;
        break;
      case "x":
        realval = realval * prevdisplay;
        break;
      case "-":
        realval = realval - prevdisplay;
        break;
      case "+":
        realval = realval + prevdisplay;
        break;
      case "":
        realval = parseInt(this.state.display);
        break;
      case "=":
        display = this.state.realval.toString();
        break;
      
        default:
        alert("sth wrong !!");
    } 
    
    this.setState({
      display: realval.toString(),
      realval: realval,
      sign: sign,
      his: this.state.his.slice().concat([sign])
    })

    // ÷ x - +
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.display}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>%</CalcButton>
            <CalcButton onClick = { () => {this.handleSignClick('÷')}} className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick = { () => {this.handleNumClick("7")}} className="calc-number">7</CalcButton>
            <CalcButton onClick = { () => {this.handleNumClick("8")}} className="calc-number">8</CalcButton>
            <CalcButton onClick = { () => {this.handleNumClick("9")}} className="calc-number">9</CalcButton>
            <CalcButton onClick = { () => {this.handleSignClick('x')}} className="calc-operator">x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick = { () => {this.handleNumClick("4")}} className="calc-number">4</CalcButton>
            <CalcButton onClick = { () => {this.handleNumClick("5")}} className="calc-number">5</CalcButton>
            <CalcButton onClick = { () => {this.handleNumClick("6")}} className="calc-number">6</CalcButton>
            <CalcButton onClick = { () => {this.handleSignClick('-')}} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick = { () => {this.handleNumClick("1")}} className="calc-number">1</CalcButton>
            <CalcButton onClick = { () => {this.handleNumClick("2")}} className="calc-number">2</CalcButton>
            <CalcButton onClick = { () => {this.handleNumClick("3")}} className="calc-number">3</CalcButton>
            <CalcButton onClick = { () => {this.handleSignClick('+')}} className="calc-operator">+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick = { () => {this.handleNumClick(0)}} className="calc-number bigger-btn">0</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)} className="calc-number">.</CalcButton>
            <CalcButton onClick = { () => {this.handleSignClick('=')}} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
