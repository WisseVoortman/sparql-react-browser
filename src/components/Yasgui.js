
import React, { useEffect } from 'react';

import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
export default function Gui() {
  useEffect(() => {
    const yasgui = new Yasgui(document.getElementById("yasgui"), {
      requestConfig: { endpoint: "http://example.com/sparql" },
      copyEndpointOnNewTab: false
    });

    // Fires when a query is executed
    yasgui.on("query", (instance: Yasgui, tab: Tab) => { console.log(tab) });

    return () => { };
  }, []);

  return <div id="yasgui" />;


}