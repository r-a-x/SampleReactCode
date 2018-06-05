const Stars = (props) => {
	return (
  	<div className="col-5">
    	{
      props.stars.map( (number,i) => <i key={i} className="fa fa-star"></i>)
      }
    </div>
  );
}

const Answer = (props) => {
	
	return (
  	<div className="col-5">
    {props.selectedNumbers.map(
    (number,i) => <span key={i} onClick = { () => { props.unselectNumber(number) } } >{number}</span>
    )}
    </div>
  );
  
}

const Button = (props) => {

	let answerButton ;
  switch(props.answerIsCorrect){
  	case true:
    answerButton=<button className="btn btn-success" onClick={() => {props.acceptAnswer()}}><i className="fa fa-check"></i></button>
    	break;
    case false:
		answerButton=<button className="btn btn-danger"><i className="fa fa-times"></i></button>
    	break;
    default:
    	answerButton=<button className="btn" disabled = {props.selectedNumbers.length === 0} onClick = { () => props.checkAnswer()} >=</button>
    	break;
      
  }
  
	return (
  	<div className="col-2">
    	{answerButton}
    </div>
  );
  
}

const Numbers = (props) => {

	const numberClassName = (number) => {
  	if ( props.usedNumbers.indexOf(number) >=0 ){
    return 'used';
    }
		if (props.selectedNumbers.indexOf(number) >= 0){
	  	return 'selected';
	  }
	  	return 'unselected';
	}

	const onClickForNumber = (number) => {
  	if (props.selectedNumbers.indexOf(number) >=0 )
    	return ;
    if ( props.usedNumbers.indexOf(number) >=0 )
    	return;
    props.selectNumber(number);
  }
  
	return (
  	<div className="card text-center">
    	<div>
      	{Numbers.list.map( (number,i) => 
        <span key={i} className={numberClassName(number)}
        onClick = { () => {console.log("The number is clicked");
        	onClickForNumber(number);
          }
        }
        >{number}</span>
        )}
      </div>
    </div>
  );
  
};

Numbers.list = _.range(1,10);

class Game extends React.Component{
	state ={
  	selectedNumbers: [],
    usedNumbers:[1,2],
    stars: _.range(1 + Math.floor( Math.random()*9) +1),
    answerIsCorrect: null
  };
  
  acceptAnswer = () => {
  console.log("The call to the accept answer is coming");
  	this.setState(
    	prevState => ({
      	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect:null,
        stars:  _.range(1 + Math.floor( Math.random()*9) +1)
      })
    );
  }
  selectNumber = (clickedNumber) => {
	  this.setState(
	    	prevState => ({
	      	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
          answerIsCorrect:null
	      })
  	);
  	console.log(this.state.selectedNumbers);
  };
  
  unselectNumber = (clickedNumber) => {
  	this.setState(
    		prevState => ({
        	selectedNumbers: prevState.selectedNumbers.filter( number => number != clickedNumber)
        })
    );
  };
  
  checkAnswer = () => {
  	console.log("Check Answer is called");
  	var sum = 0 ;
    console.log("The sum is " + sum);
  	this.state.selectedNumbers.map( (number,i) => { sum = sum + number;} ) ;
    console.log("The sum is " + sum);
    console.log("The number of the stars is "+ this.state.stars);
    var ans = this.state.stars.length === sum;
    console.log("The answer is" + ans);
    
    this.setState( prevState => ({ answerIsCorrect: ans} ) );
    	
  };
  
	render(){
  	const {selectedNumbers,stars,answerIsCorrect,usedNumbers} = this.state;
  	return (
    	<div className="container">
      <h3>Play Nine</h3>
      <hr/>
      <div className = "row">
      	<Stars stars={stars}/>
        <Button selectedNumbers={selectedNumbers} checkAnswer={this.checkAnswer} answerIsCorrect={answerIsCorrect}
        acceptAnswer ={this.acceptAnswer}/>
        <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
      </div>
      <Numbers selectedNumbers={this.state.selectedNumbers}
      selectNumber = {this.selectNumber}
      usedNumbers = {usedNumbers}
      />
      </div>
    );
  }
  
}

class App extends React.Component{
	render(){
  	return (
    	<div>
      <Game/>
      </div>
    );
  }
}

ReactDOM.render(<App/>,mountNode);
