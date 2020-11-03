import * as d3 from 'd3'
import React from 'react'
import reactDom from 'react-dom'

class D3LinkGenerator extends React.Component {
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

  getAllLinkPropertys() {
    var linkpropertys = []
    this.props.linksList.forEach(element => {
      linkpropertys.push(element.property.replace(/\s/g, ''))
    });
    return linkpropertys
  }

  render() {
    var selection = d3.select('.links')
      .selectAll('path')
      .data(this.props.linksList)

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

    var selection = d3.select('.linkstext')
      .selectAll('text')
      .data(this.props.linksList)

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
        var text = d.property.split('/')
        text.splice(0, 3)
        text = text.join('/')
        return text;
      })

    selection.exit().remove()

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

    return (
      null
    )
  }

}

export default D3LinkGenerator