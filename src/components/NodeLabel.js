import * as d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom';

class NodeLabel extends React.Component {
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
    this.d3Node = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(this.enterNodeLabel);
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data)
      .call(this.enterNodeLabel);
  }

  enterNodeLabel = (selection) => {
    selection.select('text')
      .on('click', function (d) {
      })
      .on("mouseover", function (d) {
        console.log('mouseover')
      })
      .on("mouseout", function (d) {
        console.log('mouseout')
      })
      .on("mousedown", function (d) {
        console.log('mousedown')
      })
      .on("mouseup", function (d) {
        console.log('mouseup')
      })
      .text(function (d) {
        if (d.type === 'uri') {
          var nodeURL = d.id.split('/')
          nodeURL.splice(0, 3)
          nodeURL = nodeURL.join('/')
          console.log('nodeURL: ' + nodeURL)
          return nodeURL;
        }
        return d.id;
      })
      .merge(selection)
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    // 2nd way of doing it
    // .attr('x', function (d) { return d.x })
    // .attr('y', function (d) { return d.y })
    // .attr('dy', function (d) { return 5 })

  };

  render() {
    return (
      <g>
        <text/>
      </g>
    );
  }
};

export default NodeLabel

// {
//   <svg width='1110' height='800'>
//   {this.props.nodes.nodesList.map((node, index) => <Node data={node} key={index} datasource={this.props.datasource} rs={this.rs} ssn={this.ssn} rsn={this.rsn} facn={this.facn}></Node>)}
//   {this.props.links.map((link, index) => <Link data={link} key={index}></Link>)}

// </svg>}