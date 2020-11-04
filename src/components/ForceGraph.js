import * as d3 from 'd3'
import React from 'react'

import D3NodeGenerator from './D3NodeGenerator'
import D3LinkGenerator from './D3LinkGenerator'

class ForceGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: props.nodes,
      links: props.links
    };

    this.rs = this.restartSimulation.bind(this)
    this.ssn = this.props.setSelectedNode.bind(this)
    this.rsn = this.props.removeSelectedNode.bind(this)
    this.facn = this.props.fetchAboutClickedNode.bind(this)
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
    this.forceLink = d3.forceLink()
      .links(this.props.links)
      .distance(this.props.settings.linkDistance.value).id(function (d) { return d.id; })
    this.forceCenter = d3.forceCenter((element.offsetWidth * 1) / 2, (element.offsetHeight * 1) / 2)
    this.forceCharge = d3.forceManyBody()
      .strength(this.props.settings.forceCharge.value) //defaul -30

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
    if (this.props.data.id !== prevprops.data.id) { // check if any data has changed and restart the simulation if so currently based on id in linkreducer
      d3.select('.links').selectAll('path').remove()
      d3.select('.nodesellipse').selectAll('ellipse').remove()
      d3.select('.nodestext').selectAll('text').remove()
      d3.select('.linkstext').selectAll('text').remove()
      d3.select('.defs').selectAll('path').remove()
      d3.select('.tooltips').selectAll('circle').remove()

      this.simulation.nodes(this.props.nodes.nodesList) // load new nodes
      this.simulation.force('link').links(this.props.links) // load new links
      this.restartSimulation()
    }

    if (this.props.settings !== prevprops.settings) {
      d3.select('.links').selectAll('path').remove()
      d3.select('.nodesellipse').selectAll('ellipse').remove()
      d3.select('.nodestext').selectAll('text').remove()
      d3.select('.linkstext').selectAll('text').remove()
      d3.select('.defs').selectAll('path').remove()
      d3.select('.tooltips').selectAll('circle').remove()

      //apply new linkDistance
      this.simulation.force("link")
        .distance(this.props.settings.linkDistance.value)


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




  render() {
    return (
      <div id="forcegraph">
        <D3NodeGenerator nodesList={this.props.nodes.nodesList} datasource={this.props.datasource} rs={this.rs} ssn={this.ssn} rsn={this.rsn} facn={this.facn}></D3NodeGenerator>
        <D3LinkGenerator linksList={this.props.links} forcegraphSettings={this.props.settings} action={this.rs} ssn={this.ssn}></D3LinkGenerator>
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