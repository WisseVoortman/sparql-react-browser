
import React, { useEffect } from 'react';

import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
export default function Gui() {
  useEffect(() => {
    const yasgui = new Yasgui(document.getElementById("yasgui"), {
      requestConfig: { endpoint: "https://lod.onderwijsregistratie.nl/rio/sparql" },
      copyEndpointOnNewTab: false,
    });

    // Fires when a query is executed
    yasgui.on("query", (instance: Yasgui, tab: Tab) => { console.log(tab) });

    // Get query value from editor
    console.log(yasgui)
    console.log(yasgui.config.yasqe.value)
    console.log('value', yasgui.config.yasqe.value)

    var selectedtab = yasgui.tabElements._selectedTab
    console.log(selectedtab)
    console.log('tabValue', yasgui._tabs[selectedtab].yasqe.config.value)


    return () => { };
  }, []);

  return <div id="yasgui" />;


}