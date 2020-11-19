import * as d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom';

class Node extends React.Component {
  constructor() {
    super()

    // dragging
    this.drag = (simulation) => {
      const dragstarted = (d) => {
        d3.select("#forcegraph").selectAll(".tooltip").remove()
        this.props.rs()
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
    console.log('nodemount')
    this.d3Node = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(this.enterNode);
  }

  componentDidUpdate() {
    console.log('nodeupdate')
    this.d3Node.datum(this.props.data)
      .call(this.updateNode);
  }

  enterNode = (selection) => {
    console.log('enternode')
    selection.select('ellipse')
      //.call(force.drag);
      .attr("rx", function (d) { return 30 }) //d.id.length
      .attr("ry", function (d) { return 30 }) //d.id.length
      .attr("class", "ellipse")
      .classed('uri', function (d) { return d.type === 'uri' })
      .classed('literal', function (d) { return d.type === 'literal' || d.type === 'typed-literal' })
      //.style("fill", "#FD8D3C")
      .on('click', (d) => {
        console.log('d')
      })
      .call(this.drag(this.simulation))


  };

  updateNode = (selection) => {
    console.log('updating node position')
    selection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
  };

  render() {
    console.log('rendering node')
    return (
      <g className='ellipse'>
        <ellipse />

      </g>
    );
  }
};

export default Node

// {
//   <svg width='1110' height='800'>
//   {this.props.nodes.nodesList.map((node, index) => <Node data={node} key={index} datasource={this.props.datasource} rs={this.rs} ssn={this.ssn} rsn={this.rsn} facn={this.facn}></Node>)}
//   {this.props.links.map((link, index) => <Link data={link} key={index}></Link>)}

// </svg>}