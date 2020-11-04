import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

class Slider extends React.Component {
  constructor() {
    super()

    this.state = {
      linkDistance: {
        min: 0,
        max: 400,
        value: 400,
      },
      forceCharge: {
        min: 0,
        max: 3000,
        value: 3000,

      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    let min = event.target.min
    let max = event.target.max
    console.log(event)
    this.setState({
      [name]: { min: min, max: max, value: value }
    }, () => {
      this.submit();
    });
  }

  submit() {
    this.props.setForcegraphSettings(this.state)
  }

  render() {
    return (
      <div className="slidecontainer">
        <input type="range" name='linkDistance' min={this.state.linkDistance.min} max={this.state.linkDistance.max} value={this.state.linkDistance.value} class="slider" id="linkDistance" onChange={this.handleChange} ></input>
        <p>{this.state.linkDistance.value}</p>
        <input type="range" name='forceCharge' min={this.state.forceCharge.min} max={this.state.forceCharge.max} value={this.state.forceCharge.value} class="slider" id="forceCharge" onChange={this.handleChange} ></input>
        <p>{this.state.forceCharge.value}</p>
        <button onClick={this.submit}>update</button>
      </div>
    )
  }
}

export default Slider