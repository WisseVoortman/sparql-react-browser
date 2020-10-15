import * as d3 from 'd3'
import React from 'react'

class ForceGraph extends React.Component {
  constructor(props) {
    super();
    console.log('ForceGraph rerendered')
  }

  componentDidMount() {
    var element = document.getElementById('forcegraph');

    // Redraw based on the new size whenever the browser window is resized.
    window.addEventListener("resize", () => {
      this.removeSVG()
      this.createSVG(element.offsetWidth, element.offsetHeight)
      this.createSimulation(this.props.nodes, this.props.links, element.offsetWidth, element.offsetHeight)
    });

    this.createSVG(element.offsetWidth, element.offsetHeight)
    this.createSimulation(this.props.nodes, this.props.links, element.offsetWidth, element.offsetHeight)

  }

  componentDidUpdate() {
    this.removeSimulation()
    var element = document.getElementById('forcegraph');
    this.createSimulation(this.props.nodes, this.props.links, element.offsetWidth, element.offsetHeight)
  }

  createSVG(width, height) {
    console.log('createsvg fired')

    var zoom = d3.zoom()
      .scaleExtent([1, 10])
      .on("zoom", zoomed);

    var svg = d3.select("#forcegraph")
      .append("svg")
      .attr("class", "forcegraph")
      .style("width", width * 0.8)
      .style("height", height * 0.8)
      .style("border", "1px solid black")
      .call(zoom).append("g")
    svg.append("g").attr("class", "links")
    svg.append("g").attr("class", "nodescircle")
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

  removeSimulation() {
    d3.select('.nodestext').selectAll('text').remove();
    d3.select('.nodescircle').selectAll('circle').remove();
    d3.select('.links').selectAll('path').remove();
    d3.select('.linkstext').selectAll('text').remove();

  }

  createSimulation(nodes, links, width, height) {
    //simulation
    var simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-30)) //defaul -30
      // TODO: linkdistance
      .force('center', d3.forceCenter((width * 0.8) / 2, (height * 0.8) / 2))
      .force('link', d3.forceLink().links(links).distance(200).id(function (d) { return d.id; }))
      .on('tick', ticked);

    //node properties
    function updateNodesText() {
      var selection = d3.select('.nodestext')
        .selectAll('text')
        .data(nodes)                        //bind data
        .call(drag(simulation));            //allow dragging  

      selection.enter()                     //for each row in the data do...
        .append('text')
        .on('click', function (d) {
          //alert(d.id)
          //d3.select(this).style("fill", "magenta")
        })
        .on("mouseover", function (d) {
          var connectedNodes = get_connectedNodes(d)
          set_highlight(d, connectedNodes);
        })
        .on("mouseout", function (d) {
          exit_highlight(d);
          exit_fade(d)
        })
        .on("mousedown", function (d) {

          var connectedNodes = get_connectedNodes(d)
          set_fade(d, connectedNodes);
        })
        .on("mouseup", function (d) {
          console.log('mouseup')
          exit_fade(d);
        })                    //add element
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
        .data(nodes)             //bind data
        .call(drag(simulation));            //allow dragging  

      selection.enter()                     //for each row in the data do...
        .append('circle')
        .on('click', function (d) {
          //alert(d.id)
          //d3.select(this).style("fill", "magenta")
        })
        .on("mouseover", function (d) {
          var connectedNodes = get_connectedNodes(d)
          set_highlight(d, connectedNodes);
        })
        .on("mouseout", function (d) {
          exit_highlight(d);
          exit_fade(d)
        })
        .on("mousedown", function (d) {
          var connectedNodes = get_connectedNodes(d)
          set_fade(d, connectedNodes);
        })
        .on("mouseup", function (d) {
          console.log('mouseup')
          exit_fade(d);
        })
        .attr("r", 20)
        .attr("class", "circle")
        .classed('uri', function (d) { return d.type == 'uri' })
        .classed('literal', function (d) { return d.type == 'literal' })
        //.style("fill", "#FD8D3C")
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
        .data(links)

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
        .data(links)

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
      links.forEach(element => {
        linkpropertys.push(element.property.replace(/\s/g, ''))
      });
      return linkpropertys
    }

    //update drawing nodes and links
    function ticked() {
      console.log('ticked')
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
        .on("end", dragended)
    };

    function get_connectedNodes(d) {
      //get connected nodes of d
      var connectedNodes = []

      connectedNodes.push(d.id) //add the node that is being hoverd so that it is also highlighted

      links.forEach(link => {
        if (link.source.id == d.id) {
          if (!connectedNodes.includes(link.target.id)) connectedNodes.push(link.target.id)
        }
        if (link.target.id == d.id) {
          if (!connectedNodes.includes(link.source.id)) connectedNodes.push(link.source.id)
        }
      });
      //console.log('connectedNodes: ' + connectedNodes)
      return connectedNodes
    }

    function set_highlight(d, connectedNodes) {
      // filter based on connectednodes
      d3.select('.nodescircle').selectAll('circle')
        .filter(function (circles) {
          if (connectedNodes.includes(circles.id)) { return true }
        })
        // set class
        .classed('circle_highlight', true);
    }

    function exit_highlight(d) {
      //remove all highlights
      d3.select('.nodescircle').selectAll('circle')
        .filter(function (d) { return true })
        .classed('circle_highlight', false);
    }

    function set_fade(d, connectedNodes) {
      d3.select('.nodescircle').selectAll('circle')
        .filter(function (circles) {
          if (connectedNodes.includes(circles.id)) { return false }
          else { return true }
        })
        // set class
        .classed('circle_fade', true);
    }

    function exit_fade(d) {
      //remove all highlights
      d3.select('.nodescircle').selectAll('circle')
        .classed('circle_fade', false);
    }

  }

  render() {
    return <div id="forcegraph">
    </div >;
  }
}

export default ForceGraph