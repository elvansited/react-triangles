import './App.scss';
import 'materialize-css/dist/css/materialize.min.css';

import React from "react";
import { Stage, Layer,Line } from 'react-konva';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      firstState:parseInt(0),
      secondState:parseInt(0),
      thirdState:parseInt(0),
      mustDisplayTriangle: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }
  handleInputChange(e){
    this.setState({[e.target.name]:[e.target.value]});
}
  handleSubmit(event) {
    event.preventDefault();

      event.preventDefault();
      const firstSide =  parseInt(this.state.firstState);
      const secondSide = parseInt(this.state.secondState);
      const thirdSide = parseInt(this.state.thirdState);
      const calculatedTriangle = this.valueCalulation(firstSide, secondSide, thirdSide);
      this.setState({calculatedTriangle});
      console.log(calculatedTriangle);
  }


  valueCalulation(first, second, third){

    if(first === second && first === third){
      this.endResult = 'equilateral';
    }
    else if(
      ((third - (first+ second) >= 1 ) || ( first -(second+third) >=1 ) || (second - (first+third) >= 1))){
        this.endResult = 'impossible';
     }
    else if(first == second || first == third || second == third){
      this.endResult = 'isosceles';
    }
    else if(third != second && first !=second){
    this.endResult = 'scalenes';
    }
    else {
      this.endResult = 'something went wrong!';
    }
    this.drawShape(this.endResult);
    return this.endResult;
    
  }
  drawShape(determinedForm){
    console.log('there is thsi determined form' + determinedForm)
    if(determinedForm == 'equilateral' || determinedForm == 'scalenes' || determinedForm == 'isosceles'){
      this.state.mustDisplayTriangle = true;
      if(determinedForm =='equilateral'){
        this.state.renderTriangle = [300,100, 400,200, 200,200];
      }
      else if(determinedForm =='scalenes'){
        this.state.renderTriangle = [200,100, 250,100, 350, 200];
      }
      else if(determinedForm =='isosceles'){
        this.state.renderTriangle = [300,100, 350,100, 300, 150];
      }
    }else {
        this.state.renderTriangle = [0,0];
        this.state.mustDisplayTriangle = false;
    }
  }

  render() {
    const mustDisplayTriangle = this.state.mustDisplayTriangle;
    let displayThis;
    if(!mustDisplayTriangle) {
      displayThis = ''
    }else {
      displayThis = 
      <Stage mustDisplayTriangle ={mustDisplayTriangle}
      ref="stage"
      width={600}
      height={200}
      onContentClick={this.handleClick}
      onContentMouseMove={this.handleMouseMove}
      >
        <Layer ref="layer">
          <Line
          points = {this.state.renderTriangle}
          strokeWidth = {1}
          closed = "true"
          stroke="yellow"
          fill="green"
          />
        </Layer>
      </Stage>
    }

    return (
      <div className = "container" id="example">
        <div className = "row">
          <div className="col l8 offset-l2 center">
            <div className="shapeRenderMinWidth gridChecked">      {displayThis}
            <h1><NameDisplay name={this.state.calculatedTriangle}/></h1></div>
            </div>
            <div className="col l4 offset-l2">
              <form onSubmit={this.handleSubmit}>
              <div className="row">
                  <div className="col l1"><div className="min-height-def"><span className="text-bottom">A:</span></div></div>
                  <div className="col l11">
                    <input
                      name="firstState"
                      type="number"
                      min= {1}
                      value={this.state.firstState}
                      onChange={this.handleInputChange} />
                  </div>
                  <div className="col l1"><div className="min-height-def"><span className="text-bottom">B:</span></div></div>
                  <div className="col l11">
                    <input
                      name="secondState"
                      type="number"
                      className="min-height-def"
                      min= {1}
                      value={this.state.secondState}
                      onChange={this.handleInputChange} />
                  </div>

                  <div className="col l1"><div className="min-height-def"><span className="text-bottom">C:</span></div></div>
                  <div className="col l11">

                  <input
                    name="thirdState"
                    type="number"
                    min= {1}
                    value={this.state.thirdState}
                    onChange={this.handleInputChange} />
                  </div>
                  <input type="submit" value="Calculate" className="btn waves-effect waves-teal" />
              </div>
            </form>
          </div>
      </div>
    </div>
    );
  }
}
const NameDisplay=(props)=>{
  return(
    <div>
      <div className="row">
      {props.name}
      </div>
    </div>
  )
}
export default App;
