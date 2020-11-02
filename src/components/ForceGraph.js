import * as d3 from 'd3'
import React from 'react'

import D3NodeGenerator from './D3NodeGenerator'

class ForceGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: props.nodes,
      links: props.links
    };

    // dragging
    this.drag = (simulation) => {
      const dragstarted = (d) => {
        d3.select("#forcegraph").selectAll(".tooltip").remove()
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
        .on("end", dragended)
    };

    this.rs = this.restartSimulation.bind(this)
    this.ssn = this.props.setSelectedNode.bind(this)
  }

  componentDidMount() {
    console.log('componentDidMount')
    var element = document.getElementById('forcegraph');

    // Redraw based on the new size whenever the browser window is resized.
    window.addEventListener("resize", () => {
      this.removeSVG()
      this.createSVG(element.offsetWidth, element.offsetHeight)
      this.restartSimulation()
    });

    //initial forcegraph
    this.createSVG(element.offsetWidth, element.offsetHeight)


    //initial forces
    this.forceLink = d3.forceLink().links(this.props.links).distance(400).id(function (d) { return d.id; })
    this.forceCenter = d3.forceCenter((element.offsetWidth * 1) / 2, (element.offsetHeight * 1) / 2)
    this.forceCharge = d3.forceManyBody().strength(-3000) //defaul -30

    //simulation --> simulation gets updated upon interaction
    this.simulation = d3.forceSimulation(this.props.nodes.nodesList)
      .force('center', this.forceCenter)
      .force('charge', this.forceCharge)
      .force('link', this.forceLink)
    this.simulation.on('tick', () => {
      console.log('tick')
      this.setState({
        //call this.setstate to rerender with react.
      })
    });
  }

  componentDidUpdate(prevprops) {
    this.simulation.nodes(this.props.nodes.nodesList) // load new nodes
    this.simulation.force('link').links(this.props.links) // load new links


    if (this.props.data.id !== prevprops.data.id) { // check if any data has changed and restart the simulation if so currently based on id in linkreducer
      d3.select('.links').selectAll('path').remove()
      d3.select('.nodesellipse').selectAll('ellipse').remove()
      d3.select('.nodestext').selectAll('text').remove()
      d3.select('.linkstext').selectAll('text').remove()
      d3.select('.defs').selectAll('path').remove()
      d3.select('.tooltips').selectAll('circle').remove()

      console.log('restartSimulation')
      this.restartSimulation()
    }
  }

  componentWillUnmount() {
    this.simulation.stop();
  }

  createSVG(width, height) {
    console.log('createsvg')

    var zoom = d3.zoom()
      .scaleExtent([.5, 10])
      .on("zoom", zoomed);

    var svg = d3.select("#forcegraph")
      .append("svg")
      .attr("class", "forcegraph")
      .style("width", width * 1)   // set size of svg in relation to parent
      .style("height", height * 1) // set size of svg in relation to parent
      .style("border", "1px solid black")
      .call(zoom).append("g")
    svg.append("g").attr("class", "links")
    svg.append("g").attr("class", "nodesellipse")
    svg.append("g").attr("class", "nodestext")
    svg.append("g").attr("class", "linkstext")
    svg.append("defs").attr("class", "defs")
    svg.append("g").attr("class", "tooltips")

    function zoomed() {
      const currentTransform = d3.event.transform;
      svg.attr("transform", currentTransform);
      //slider.property("value", currentTransform.k);
    }

    // function slided(d) {
    //   zoom.scaleTo(svg, d3.select(this).property("value"));
    // }

    // var slider = d3.select("#forcegraph").append("p").append("input")
    //   .datum({})
    //   .attr("type", "range")
    //   .attr("value", zoom.scaleExtent()[0])
    //   .attr("min", zoom.scaleExtent()[0])
    //   .attr("max", zoom.scaleExtent()[1])
    //   .attr("step", (zoom.scaleExtent()[1] - zoom.scaleExtent()[0]) / 100)
    //   .on("input", slided);
  }

  removeSVG() {
    d3.select('#forcegraph').selectAll('svg').remove()
  }

  restartSimulation() {
    this.simulation.alpha(1).restart()
  }

  links() {
    var selection = d3.select('.links')
      .selectAll('path')
      .data(this.props.links)

    selection.enter()
      .append('path')
      .attr("class", function (d) { return "link" })
      .attr("class", function (d) { return "link " + d.property; })
      .attr("id", function (d, i) { return "linkId_" + i; })
      .attr("marker-end", function (d) { return "url(#" + d.property.replace(/\s/g, '') + ")"; }) //removed to allow matching
      .merge(selection)
      .attr("d", function (d) {
        var dx = d.target.x - d.source.x
        var dy = d.target.y - d.source.y
        if (d.linknum) {
          var dr = d.linknum * 150 - 150;
        }
        else {
          var dr = 0
        }

        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
      })



    selection.exit().remove()
  }

  linktext() {
    var selection = d3.select('.linkstext')
      .selectAll('text')
      .data(this.props.links)

    selection.enter()
      .append("text")
      .on('click', function (d) {
        //window.location.href = d.id // opens in the same page
        window.open(d.id)           // opens in a new page
      })
      .attr("x", "200")
      .attr("class", "linklabel")
      .append("textPath")
      .attr("xlink:href", function (d, i) { return "#linkId_" + i; })
      .text(function (d) {
        var propertyURL = d.property.split('/')
        propertyURL.splice(0, 3)
        propertyURL = propertyURL.join('/')
        console.log('propertyURL: ' + propertyURL)
        return propertyURL;
      })

    selection.exit().remove()

  }

  linkmarker() {
    var selection = d3.select('.defs')
      .selectAll('marker')
      .data(this.getAllLinkPropertys())

    selection.enter()
      .append("marker")
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 40) // distance from link
      .attr("refY", 0) //deviation from link linke
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");


    selection.exit().remove()
  }

  getAllLinkPropertys() {

    var linkpropertys = []
    this.props.links.forEach(element => {
      linkpropertys.push(element.property.replace(/\s/g, ''))
    });
    return linkpropertys
  }

  getConNodes() {
    console.log('conNodes')
  }

  render() {
    this.links()
    //this.nodesellipse()
    //this.nodestext()
    this.linktext()
    this.linkmarker()



    return (
      <div id="forcegraph">
        <D3NodeGenerator nodesList={this.props.nodes.nodesList} action={this.rs} ssn={this.ssn}></D3NodeGenerator>
      </div >
    );
  }
}

ForceGraph.defaultProps = {
  width: 600,
  height: 600,
  forceStrength: -10
};

export default ForceGraph

/*
can dispatch actions from child component

try passing drag in the same way
d3 select .call in react component maybe?
*/