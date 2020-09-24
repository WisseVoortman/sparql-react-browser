import React from 'react';

//Router
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/store/middleware'

//bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';


//custom stylesheet
import './App.scss';

import ConnectedForceGraph from './containers/ConnectedForceGraph';
import ConnectedSearch from './containers/ConnectedSearch'
import ConnectedDataSourceDropdown from './containers/ConnectedDataSourceDropdown'

//devtools
import DevTools from './containers/DevTools.jsx'

import { Provider } from 'react-redux'

import configureStore from './redux/store/index'

// Layout components
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav';
import PageContent from './components/PageContent';

//init redux store
const store = configureStore()
const initialState = store.getState()

console.log('initializing store: ', store.getState())

const unsubscribe = store.subscribe(() => {
  //console.log('state changed: ', store.getState())
})




const App = () => (
  <Provider store={store}>
    <div className="App">
      <ConnectedRouter history={history}>
        <Header />
        <PageContent />
        <Footer />
      </ConnectedRouter>
      {/* exclude devtools in production */}
      {(process.env.NODE_ENV !== 'production') && <DevTools />}
    </div>
  </Provider>
);

export default App;


{/* <ConnectedSearch />
        <ConnectedDataSourceDropdown />
        <ConnectedForceGraph /> */}


