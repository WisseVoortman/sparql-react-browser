import * as d3 from 'd3'
import React from 'react'

var width = 600, height = 600

class ForceGraph extends React.Component {
  constructor(props) {
    super();

    var nodes = props.nodes
    var links = props.links

    //simulation
    var simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-10)) //defaul -30
      // TODO: linkdistance
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink().links(links).id(function (d) { return d.id; }))
      .force('link', d3.forceLink().distance(1000))

      .on('tick', ticked);

    //node properties
    function updateNodesText() {
      var selection = d3.select('.nodestext')
        .selectAll('text')
        .data(nodes)                        //bind data
        .call(drag(simulation));            //allow dragging  

      selection.enter()                     //for each row in the data do...
        .append('text')                     //add element
        .text(function (d) {                // add attributes
          return d.id
        })
        .merge(selection)
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      // 2nd way of doing it
      // .attr('x', function (d) { return d.x })
      // .attr('y', function (d) { return d.y })
      // .attr('dy', function (d) { return 5 })

      selection.exit().remove()
    }

    function updateNodesCircle() {
      var selection = d3.select('.nodescircle')
        .selectAll('circle')
        .data(nodes)                        //bind data
        .call(drag(simulation));            //allow dragging  

      selection.enter()                     //for each row in the data do...
        .append('circle')
        .attr("r", 20)
        .style("fill", "#FD8D3C")
        .merge(selection)
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
      //2nd way of doing the positioning
      // .attr("transform", function (d) {
      //   return "translate(" + d.x + "," + d.y + ")";
      // })

      selection.exit().remove()
    }

    //link properties
    function updateLinks() {
      var selection = d3.select('.links')
        .selectAll('path')
        .data(links)

      selection.enter()
        .append('path')
        .attr("class", function (d) { return "link" })
        .attr("class", function (d) { return "link " + d.type; })
        .merge(selection)
        .attr("d", function (d) {
          var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = 100 / 2;  //linknum is defined above
          return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        });


      selection.exit().remove()
    }

    function updateLabels() {
      var selection = d3.select('.labels')
        .selectAll('text')
        .data(links)

      selection.enter()
        .append('text')
        .text(function (d) {
          return d.property
        })
        .merge(selection)
        .attr('x', function (d) {
          return d.source.x
        })
        .attr('y', function (d) {
          return d.source.y
        })
        .attr('dx', function (d) {
          return d.target.x - d.source.x
        })
        .attr('dy', function (d) {
          return d.target.y - d.source.y
        })

      selection.exit().remove()
    }



    //update drawing nodes and links
    function ticked() {
      updateNodesText()
      updateNodesCircle()
      updateLinks()
      //updateLabels()
    }

    // dragging
    const drag = (simulation) => {
      const dragstarted = (d) => {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      };

      const dragged = (d) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      };

      const dragended = (d) => {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      };

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };

  }

  render() {

    return <div id="content">
      <svg width={width} height={height} style={{ border: "1px solid black" }}>
        <g class="links"></g>
        <g class="nodescircle"></g>
        <g class="nodestext"></g>
        <g class="labels"></g>
        <g class="linktext"></g>
      </svg>
    </div >;
  }
}

export default ForceGraph