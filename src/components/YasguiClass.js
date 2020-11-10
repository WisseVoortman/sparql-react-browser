
import React, { useEffect } from 'react';

import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";

class Gui extends React.Component {
  constructor(props) {
    super()

    this.yasgui = null

    this.submitquery = this.submitquery.bind(this)

  }

  componentDidMount() {
    this.yasgui = new Yasgui(document.getElementById(this.props.prop), {
      requestConfig: { endpoint: "https://lod.onderwijsregistratie.nl/rio/sparql" }, // this is not used
      persistencyExpire: 0,
      copyEndpointOnNewTab: false,
    })

    // Fires when a query is executed
    this.yasgui.on("query", (instance: Yasgui, tab: Tab) => { console.log(tab) });

    // Get query value from editor
    console.log(this.yasgui)
    console.log('value', this.yasgui.config.yasqe.getValue)

    var selectedtab = this.yasgui.tabElements._selectedTab
    console.log(selectedtab)
    console.log('tabValue', this.yasgui._tabs[selectedtab].yasqe.config.value)
    console.log(this.yasgui.config.yasqe)
  }

  submitquery() {
    var selectedtab = this.yasgui.tabElements._selectedTab
    var query = this.yasgui._tabs[selectedtab].persistentJson.yasqe.value
    console.log(query)
    this.props.action(query, this.props.datasource)
  }

  render() {
    return (
      <div>
        <div id={this.props.prop}></div>
        <button onClick={() => this.submitquery()}>button</button>
      </div>
    )
  }
}

export default Gui