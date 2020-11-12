
import React from 'react';
import YASQE from "@triply/yasqe";
import "@triply/yasqe/build/yasqe.min.css"

class Yasqe extends React.Component {
  constructor(props) {
    super(props);
    var yasqe = null;
    var yasr = null;
  }

  componentDidMount() {
    this.yasqe = YASQE.fromTextArea(document.getElementById("yasqe"), {
      sparql: {
        showQueryButton: true
      }
    });
    this.yasqe.refresh();

    this.yasqe.on("change", () => { console.log('ok man') });
    console.log(this.yasqe)
  }

  render() {
    console.log("Sparql endpoint");
    return (
      <div >
        <div>
          <textarea id="yasqe"></textarea>
          <div id="yasr"></div>
        </div>
      </div>
    );
  }
}

export default Yasqe