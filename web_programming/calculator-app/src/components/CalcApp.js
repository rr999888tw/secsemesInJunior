import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
    };
  }

  resetState() {
    // TODO
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">1980</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>%</CalcButton>
            <CalcButton className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number">7</CalcButton>
            <CalcButton className="calc-number">8</CalcButton>
            <CalcButton className="calc-number">9</CalcButton>
            <CalcButton className="calc-operator">x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number">4</CalcButton>
            <CalcButton className="calc-number">5</CalcButton>
            <CalcButton className="calc-number">6</CalcButton>
            <CalcButton className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number">1</CalcButton>
            <CalcButton className="calc-number">2</CalcButton>
            <CalcButton className="calc-number">3</CalcButton>
            <CalcButton className="calc-operator">+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number"></CalcButton>
            <CalcButton className="calc-number">0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
