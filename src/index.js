import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap';
import {jQuery as $} from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js'
import index from './js/index'
import {SET_CURRENT_DATASOURCE} from "./js/constants/action-types";
import store from "./js/store/index";
import { Provider } from "react-redux"


function Datasource(props) {
  return <a className="dropdown-item" href="#" onClick={props.onClick}>
          {props.name}
         </a>
}

function DataSourceDropdown(props) {
  return <div className="setDataSourceDropdown">
    <div className="dropdown show">
      <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
      id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
      aria-expanded="false">Specificeer bron</a>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        {
          props.datasources.map((item, key) =>
            <Datasource
              key={key}
              onClick={() => props.onClick(key)}
              name={item.name}
              />
          )
        }
      </div>
    </div>
  </div>
}

class App extends React.Component {

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
          },
          {
            name: 'Kennisnet',
            endpoint: 'http://localhost:8080/rdf4j-workbench/repositories/kennisnet/query'
          }
        ]
      };
    }

  handleClick(key) {
    store.dispatch({
      type: SET_CURRENT_DATASOURCE,
      currentDatasource: key
    });
    let newState = Object.assign({},this.state)
    newState.currentDatasource =key
    this.setState(newState);
  }

  render() {
    return (
      <div className="content">
        <p>{this.state.datasources[this.state.currentDatasource].name}</p>
        <DataSourceDropdown
            onClick={(key)=> this.handleClick(key)}
            datasources={this.state.datasources}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
