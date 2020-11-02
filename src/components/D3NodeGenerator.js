import * as d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom'

class D3NodeGenerator extends React.Component {
  constructor() {
    super()

    // dragging
    this.drag = (simulation) => {
      const dragstarted = (d) => {
        d3.select("#forcegraph").selectAll(".tooltip").remove()
        this.props.action()
        d.fx = d.x;
        d.fy = d.y;
      };

      const dragged = (d) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      };

      const dragended = (d) => {
        //if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      };

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    };
  }

  componentDidMount() {
  }

  render() {
    var selection = d3.select('.tooltips')
      .selectAll('ellipse')
      .data(this.props.nodesList)             //bind data
      .call(this.drag(this.simulation));            //allow dragging  

    selection.enter()                     //for each row in the data do...
      .append('ellipse')
      .on('click', () => this.props.ssn('d.id'))
      .attr("rx", function (d) { return 30 }) //d.id.length
      .attr("ry", function (d) { return 30 }) //d.id.length
      .attr("class", "ellipse")
      .classed('uri', function (d) { return d.type === 'uri' })
      .classed('literal', function (d) { return d.type === 'literal' })
      //.style("fill", "#FD8D3C")
      .merge(selection)
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })

    selection.exit().remove()
    return (
      null
    )
  }
}
export default D3NodeGenerator