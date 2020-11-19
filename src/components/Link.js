import * as d3 from 'd3'
import React from 'react'

import ReactDOM from 'react-dom';

class Link extends React.Component {
  componentDidMount() {
    this.d3Link = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(this.enterLink);
  }

  componentDidUpdate() {
    this.d3Link.datum(this.props.data)
      .call(this.updateLink);
  }

  enterLink = (selection) => {
    selection.attr("stroke-width", (d) => d.size);
  };

  updateLink = (selection) => {
    selection.attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
  };

  render() {
    return (<line className='link' />);
  }
}

export default Link

