   if(this.state.prevSignEx === false){
      this.setState({
        display : num,
        realval : num, //this.state.realval,
        prevSignEx : false,
        prevSign : ""
      })
      return;
    }

    else{
      let realval = this.state.realval;
      let prevSign = this.state.prevSign;
      switch(prevSign){
        case "÷":
          realval = realval / num;
          break;
        case "x":
          realval = realval * num;
          break;
        case "-":
          realval = realval - num;
          break;
        case "+":
          realval = realval + num;
          break;
      } 
      this.setState({
        display : num,
        realval : realval,
        prevSignEx : false,
        prevSign : ""
      })  


    }
