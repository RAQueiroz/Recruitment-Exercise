import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {
  createNetworkInterface,
  IntrospectionFragmentMatcher
} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { 
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux';
import { reducer as formReducer } from 'redux-form';

import introspectionQueryResultData from './fragmentTypes.json';
import RecruitmentFormContainer from './containers/RecruitmentFormContainer';

const networkInterface = createNetworkInterface({
  uri: 'https://app.pipefy.com/public_api'
});
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});
const client = new ApolloClient({
  fragmentMatcher,
  networkInterface
});

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer
  }),
  {},
  compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <RecruitmentFormContainer />
  </ApolloProvider>
  , document.getElementById('root')
);
