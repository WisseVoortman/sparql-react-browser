import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap';
import {jQuery as $} from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js'

function Datasource(props) {
  return <a class="dropdown-item" href="#" onClick={props.onClick}>
          {props.name}
         </a>
}

class DatasourcePlugin extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        currentDatasource: 0,
        datasources: [
          {
            name: 'Onderwijsregistratie',
            endpoint: 'http://localhost:8080/rdf4j-workbench/repositories/rio/query'
          },
          {
            name: 'Basisregistraties',
            endpoint: 'https://data.pdok.nl/sparql'
          },
          {
            name: 'Onderwijsinspectie',
            endpoint: 'http://localhost:8080/rdf4j-workbench/repositories/ivho/query'
          }
        ]
      };
    }
  handleClick(key) {
    this.setState({
      currentDatasource: key,
      datasources: this.state.datasources
    });
  }
  render() {
    return (
      <div className="setDataSourceDropdown">
        <div class="dropdown show">
          <p>{this.state.datasources[this.state.currentDatasource].name}</p>
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button"
          id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false">Specificeer bron</a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            {
              this.state.datasources.map((item, key) =>
                <Datasource
                  key={key}
                  onClick={() => this.handleClick(key)}
                  name={item.name}
                  />
              //<a class="dropdown-item" href="#" onClick={this.handleClick({key})}>{item.name}</a>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <DatasourcePlugin />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
