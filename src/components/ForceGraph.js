import * as d3 from 'd3'
import React from 'react'

class ForceGraph extends React.Component {
  constructor(props) {
    super();
    this.width = 600
    this.height = 600
    this.uniqueID = Math.random()
    console.log('ForceGraph rerendered')

    //simulation
    var simulation = d3.forceSimulation(props.nodes)
      .force('charge', d3.forceManyBody().strength(-30)) //defaul -30
      // TODO: linkdistance
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('link', d3.forceLink().links(props.links).distance(200).id(function (d) { return d.id; }))
      .on('tick', ticked);

    //node properties
    function updateNodesText() {
      var selection = d3.select('.nodestext')
        .selectAll('text')
        .data(props.nodes)                        //bind data
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
        .data(props.nodes)             //bind data
        .call(drag(simulation));            //allow dragging  

      selection.enter()                     //for each row in the data do...
        .append('circle')
        .attr("r", 20)
        .style("fill", "#FD8D3C")
        .merge(selection)
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })

      selection.exit().remove()
    }

    //link properties
    function updateLinks() {
      var selection = d3.select('.links')
        .selectAll('path')
        .data(props.links)

      selection.enter()
        .append('path')
        .attr("class", function (d) { return "link" })
        .attr("class", function (d) { return "link " + d.property; })
        .attr("id", function (d, i) { return "linkId_" + i; })
        .attr("marker-end", function (d) { return "url(#" + d.property.replace(/\s/g, '') + ")"; }) //removed to allow matching
        .merge(selection)
        .attr("d", function (d) {
          var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = 300 / 1;  //linknum is defined abov TODO: update to use linknum from the links 
          return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        })



      selection.exit().remove()
    }

    function updateLinksText() {
      var selection = d3.select('.linkstext')
        .selectAll('text')
        .data(props.links)

      selection.enter()
        .append("text")
        .attr("x", "100")
        .attr("y", "-20")
        .attr("class", "linklabel")
        .append("textPath")
        .attr("xlink:href", function (d, i) { return "#linkId_" + i; })
        .text(function (d) {
          return d.property;
        })

      selection.exit().remove()
    }

    function updateLinkMarkers() {
      var selection = d3.select('.defs')
        .selectAll('marker')
        .data(getAllLinkPropertys())

      selection.enter()
        .append("marker")
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 30) // distance from link
        .attr("refY", 0) //deviation from link linke
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");


      selection.exit().remove()
    }

    function getAllLinkPropertys() {

      var linkpropertys = []
      props.links.forEach(element => {
        linkpropertys.push(element.property.replace(/\s/g, ''))
      });
      return linkpropertys
    }

    //update drawing nodes and links
    function ticked() {
      updateNodesText()
      updateNodesCircle()
      updateLinks()
      updateLinksText()
      updateLinkMarkers()
    }

    function linkDeviation(d) {
      var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = 150 / 2;  //linknum is defined above
      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;

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
    return <div id="forcegraph" >
      <svg width={this.width} height={this.height} style={{ border: "1px solid black" }}>
        <g class="links"></g>
        <g class="nodescircle"></g>
        <g class="nodestext"></g>
        <g class="linkstext"></g>
        <defs class="defs"></defs>
      </svg>
    </div >;
  }
}

export default ForceGraph