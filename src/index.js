import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap';
import {jQuery as $} from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js'
import { createStore } from 'redux'

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
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const SET_CURRENT_DATASOURCE = 'SET_DATASOURCE'

function counter(state, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case SET_CURRENT_DATASOURCE:
      newState.currentDatasource = action.currentDatasource;
      return newState;
    default:
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => console.log("current datasource:"+ store.getState().currentDatasource))
