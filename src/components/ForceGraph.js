import * as d3 from 'd3'
import React from 'react'

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
    this.simulation = d3.forceSimulation(this.props.nodes)
      .force('center', this.forceCenter)
      .force('charge', this.forceCharge)
      .force('link', this.forceLink)
    this.simulation.on('tick', () => this.setState({
      //call this.setstate to rerender with react.
    }));
  }

  componentDidUpdate(prevprops) {
    this.simulation.nodes(this.props.nodes) // load new nodes
    this.simulation.force('link').links(this.props.links) // load new links

    //console.log('hier')
    //console.log(prevprops.data.id)
    //console.log(this.props.data.id)
    if (this.props.data.id !== prevprops.data.id) { // check if any data has changed and restart the simulation if so currently based on id in linkreducer
      //d3.selectAll("svg > *").remove()

      d3.select('.links').selectAll('path').remove()
      d3.select('.nodesellipse').selectAll('ellipse').remove()
      d3.select('.nodestext').selectAll('text').remove()
      d3.select('.linkstext').selectAll('text').remove()
      // d3.select('.defs').selectAll('path').remove()

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

  nodesellipse() {
    var selection = d3.select('.nodesellipse')
      .selectAll('ellipse')
      .data(this.props.nodes)             //bind data
      .call(this.drag(this.simulation));            //allow dragging  

    selection.enter()                     //for each row in the data do...
      .append('ellipse')
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

  }

  nodestext() {
    var selection = d3.select('.nodestext')
      .selectAll('text')
      .data(this.props.nodes)                        //bind data
      .call(this.drag(this.simulation));            //allow dragging  

    selection.enter()                     //for each row in the data do...
      .append('text')

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

    selection.exit().remove()
  }

  linktext() {
    var selection = d3.select('.linkstext')
      .selectAll('text')
      .data(this.props.links)

    selection.enter()
      .append("text")
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
    this.nodesellipse()
    this.nodestext()
    this.linktext()
    this.linkmarker()



    return (
      <div id="forcegraph">
        {/* {this.props.nodes.map((node, index) => (
            <Circle node={node} index={index}></Circle>
          ))}
          {this.props.links.map((link, index) => (
            <Link link={link} index={index}></Link>
          ))} */}
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


class Circle extends React.Component {
  render() {
    return (
      <g>
        <circle r={20} cx={this.props.node.x} cy={this.props.node.y} fill="red" key={this.props.index} onClick={() => alert('You have clicked the circle.')} />
        <text>{this.props.node.id}</text>
      </g>


    )
  }

}

class Link extends React.Component {
  render() {
    return (<line
      x1={this.props.link.source.x}
      y1={this.props.link.source.y}
      x2={this.props.link.target.x}
      y2={this.props.link.target.y}
      key={`line-${this.props.index}`}
      stroke="black" />)
  }

}