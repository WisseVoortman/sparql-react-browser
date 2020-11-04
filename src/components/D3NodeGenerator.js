import * as d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom'

class D3NodeGenerator extends React.Component {
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
  }

  renderNodeEllipse() {
    var selection = d3.select('.nodesellipse')
      .selectAll('ellipse')
      .data(this.props.nodesList)             //bind data
      .call(this.drag(this.simulation));            //allow dragging  

    selection.enter()                     //for each row in the data do...
      .append('ellipse')
      .on('click', (d) => {
        this.props.ssn(d.id)
        this.props.rsn()
        if (d.type === 'uri') {
          this.props.facn(d.id, this.props.datasource)
        }
      })
      .on("mouseover", function (d) {
        console.log('mouseover')
        console.log(d)
        console.log(this)

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
      .classed('literal', function (d) { return d.type === 'literal' || d.type === 'typed-literal' })
      //.style("fill", "#FD8D3C")
      .merge(selection)
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })

    selection.exit().remove()
  }

  renderNodeText() {
    var selection = d3.select('.nodestext')
      .selectAll('text')
      .data(this.props.nodesList)                        //bind data
      .call(this.drag(this.simulation));            //allow dragging  

    selection.enter()                     //for each row in the data do...
      .append('text')

      .on('click', function (d) {
        var div = d3.select("#forcegraph")
          .append("div")
          .attr("class", "tooltip dropdown")
          .style("opacity", 0)
          .style("left", (d3.event.pageX + 28) + "px")
          .style("top", (d3.event.pageY - 28) + "px");

        var button = d3.select("#forcegraph").selectAll(".tooltip")
          .append("button")
          .attr("class", "btn btn-secondary dropdown-toggle")
          .attr("type", "button")
          .attr("id", "dropdownMenuButton")
          .attr("data-toggle", "dropdown")
          .attr("aria-haspopup", "true")
          .attr("aria-expanded", "false")
          .text(d.id)

        var dropdownMenu = d3.select("#forcegraph").selectAll(".tooltip")
          .append("div")
          .attr("class", "dropdown-menu")
          .attr("aria-labelledby", "dropdownMenuButton")

        if (d.type === "uri") {
          dropdownMenu.append("a")
            .attr("class", "dropdown-item")
            .attr("href", d.id)
            .text("go to uri")
        }
        dropdownMenu.append("a")
          .attr("class", "dropdown-item")
        dropdownMenu.append("a")
          .attr("class", "dropdown-item")


        d3.select(".tooltip").transition()
          .duration(200)
          .style("opacity", .9)
          .style("left", (d3.event.pageX + 28) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        // if (d.type === 'uri') {
        //   //window.location.href = d.id // opens in the same page
        //   window.open(d.id)           // opens in a new page
        // }
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

  render() {
    this.renderNodeEllipse()
    this.renderNodeText()



    return (
      null
    )
  }
}
export default D3NodeGenerator