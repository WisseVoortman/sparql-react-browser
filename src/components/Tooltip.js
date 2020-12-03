import * as d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom';

class Marker extends React.Component {
  constructor() {
    super()
  }

  render() {

    const renderTooltip = () => {
      if(this.props.nodes.selectedNode){

        function selectedNode(node) { 
          return node.selected === true;
        }

        var sn = this.props.nodes.nodesList.find(selectedNode)
        console.log(sn)

        
        return (
          <foreignObject x={this.props.nodes.selectedNode.x} y={this.props.nodes.selectedNode.y} width="60" height="40">
          <div>
            <title>hallo</title>
            <p>selected node</p>
          
          </div>
        </foreignObject>
        )
      } else {
        return(
          <foreignObject x="0" y="0" width="60" height="40">
          <div><p>no selected node</p>          
          </div>
        </foreignObject>
        )
      }
    }
        return (
          <>
          {renderTooltip()}
          </>
    )
  }
};

export default Marker

  

