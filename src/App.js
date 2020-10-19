import React from 'react';

//Router
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/store/middleware'

//bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

//custom stylesheet
import './css/App.scss';

//devtools
import DevTools from './containers/DevTools.jsx'

import { Provider } from 'react-redux'

import configureStore from './redux/store/index'

//Bootrap components
import Container from 'react-bootstrap/Container'

// Layout components
import Header from './components/Header'
import Footer from './components/Footer'
import PageContent from './components/PageContent';
import ConnectedLoading from './containers/ConnectedLoading'
import ConnectedError from './containers/ConnectedError'

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
        <Container>
          <PageContent />
          <ConnectedLoading />
          <ConnectedError />
        </Container>

        <Footer />
      </ConnectedRouter>
      {/* exclude devtools in production */}
      {(process.env.NODE_ENV !== 'production') && <DevTools />}
    </div>
  </Provider>
);

export default App;

