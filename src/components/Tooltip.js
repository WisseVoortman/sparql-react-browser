import * as d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom';
import styles from './Tooltip.module.scss'
import { Popover, Table } from 'react-bootstrap'
import Scrollbox from './ScrollBox'

class Tooltip extends React.Component {
  constructor() {
    super()

    // dragging
    this.drag = () => {
      const dragstarted = (d) => {
        this.props.rs()
        d.fx = d.x;
        d.fy = d.y;
      };

      const dragged = (d) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      };

      const dragended = (d) => {
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
      .call(this.enterTooltip);
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data)
      .call(this.enterTooltip);
  }

  enterTooltip = (selection) => {
    selection.select("foreignObject")
    .on("mouseout", (d) => {
        console.log('mouseout')
        //this.props.rsn()
      })
    .attr("transform", (d) => "translate(" + (d.x+25) + "," + (d.y-10) + ")")
    .classed("none", (d) => { return (d.id !== this.props.selectedNode.id)})
    .call(this.drag())

  };


  render() {
    const renderTable = () => {
      return (
        <Scrollbox orientation="scrollbox-x">
        <Table>
          <tr>
            <th>property</th>
            <th>value</th>
          </tr>
          
          {renderlinks()}
        
        </Table>
        </Scrollbox>
      ) 
  }

  const linkBelongs = (link) => {
    return true
  }
  
  const renderlinks = () => {
    var links = this.props.linksList.filter(linkBelongs)
    return links.map((link) => <tr><td>{link.property}</td><td>{link.target.id}</td></tr>)
  }

    return (
      <g>
        <foreignObject width="1" height="1" className={styles.tooltip}>
          <div>
            <Popover id="popover-basic" className={styles.popover}>
              <Popover.Title as="h3">{this.props.data.id}
              <button type="button" class="close" onClick={() => this.props.rsn()}><span>×</span></button>
              </Popover.Title>
              <Popover.Content>
                {renderTable()}
              </Popover.Content>
            </Popover>       
          </div>
        </foreignObject>
      </g>
    );
  }
};

export default Tooltip


