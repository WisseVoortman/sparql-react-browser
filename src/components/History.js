import React from 'react'
import { isValidHttpUrl } from '../utils/index'

import { Form } from 'react-bootstrap'

class History extends React.Component {
  constructor(props) {
    super();

    this.handleChange = this.handleChange.bind(this)
  }

handleChange(event) {
  console.log(event.target.value);
}

  componentDidMount(){
    if(isValidHttpUrl(this.props.selectedNode.id)){
      // fire query to determine all the graph that exist of the selected node uri
      this.props.fhg(this.props.selectedNode.id, this.props.datasource)
    }
    
  }

  componentDidUpdate(prevprops){
    if(this.props.selectedNode.id !==  prevprops.selectedNode.id && isValidHttpUrl(this.props.selectedNode.id)){
      // fire query to determine all the graph that exist of the selected node uri when it gets updated
      this.props.fhg(this.props.selectedNode.id, this.props.datasource)
    }
    
  }

  render() {

 const renderHistorySelect = () => {
   if(this.props.selectedNode.history && this.props.selectedNode.history.length > 1){  
   return(
    <>
      <p>History van: {this.props.selectedNode.id}</p>
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>History opties</Form.Label>
          <Form.Control as="select" onChange={this.handleChange}>
            {this.props.selectedNode.history.map((h, i) => {
              return (<option key={i}>{h}</option>) })}
          </Form.Control>
        </Form.Group>
      </Form>
  </>

   )
   } 
   else {
     return(<p>geen history beschikbaar</p>)
   }
  }

    return(
      <div>
      
            {renderHistorySelect()}
    
      </div>
    )
  }
}
export default History