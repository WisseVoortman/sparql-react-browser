import * as d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom';

import { setSelectedNode, removeSelectedNode, fetchAboutClickedNode } from '../redux/actions/index'

import ConnectedTooltip from '../containers/ConnectedTooltip'

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
    this.d3Node = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(this.enterNode);
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data)
      .call(this.enterNode);
  }

  enterNode = (selection) => {
    selection.select("ellipse")
      .on('click', (d) => {
        console.log('igotclicked')
        this.props.ssn(d)
        //this.props.rsn()
        if (d.type === 'uri') {
          this.props.facn(d.id, this.props.datasource)
        }
        
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
      .attr("rx", function (d) { return 30 }) //d.id.length
      .attr("ry", function (d) { return 30 }) //d.id.length
      .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
      .attr("class", "ellipse")
      .classed('uri', function (d) { return d.type === 'uri' })
      .classed('literal', function (d) { return d.type === 'literal' || d.type === 'typed-literal' })
      .call(this.drag(this.simulation))


  };

  render() {
    return (
      <g>
        <ellipse className='ellipse' />
        <ConnectedTooltip />
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