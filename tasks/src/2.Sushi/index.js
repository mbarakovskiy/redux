import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import 'regenerator-runtime/runtime';
import './styles.css';
import Page from './constants/Page';
import Status from './constants/Status';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './containers/Navigation';
import Pages from './containers/Pages';
import { rootReducer } from './reducers';
import products from './api/products';
import Api from './api';
import { Provider } from 'react-redux';

const productsAllIds = products.map(p => p.id);
const productsById = products.reduce(
  (result, product) => ({ ...result, [product.id]: product }),
  {}
);

const preloadedState = {
  page: Page.menu,
  products: {
    allIds: productsAllIds,
    byId: productsById,
    status: Status.loaded
  }
};

const api = new Api({ baseUrl: 'http://sampleserviceurl?foo=bar' });

const store = createStore(rootReducer, preloadedState);

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <div>
            <ErrorBoundary>
              <header className="header">
                <h1>Sushi &amp; Rolls</h1>
                <Navigation />
              </header>
              <Pages />
            </ErrorBoundary>
          </div>
        </Provider>
    );
  }
}

App.propTypes = {};

ReactDom.render(<App />, document.getElementById('app'));
