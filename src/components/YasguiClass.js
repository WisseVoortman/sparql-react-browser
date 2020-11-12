
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
      persistentConfig: {
        storageId: "yagui__config" + this.props.prop
      }

    })

    this.yasgui.on("tabChange", (instance: Yasgui, tab: Tab) => {
      console.log('the tab has changed')
      var selectedtab = this.yasgui.tabElements._selectedTab
      //this.yasgui._tabs[selectedtab].yasqe.on("change", () => { console.log('ok man') });
    });

    console.log(this)
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